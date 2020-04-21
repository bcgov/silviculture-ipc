const request = require('supertest');

const helper = require('../../../common/helper');

const dataService = require('../../../../src/services/dataService');
const router = require('../../../../src/routes/v1/ipc');
const validIPCPost = require('../../../fixtures/validIPCPost.json');

// Simple Express Server
const basePath = '/api/v1/ipc';
const app = helper.expressHelper(basePath, router);
helper.logHelper();

describe(`GET ${basePath}`, () => {
  it.skip('should yield an ok response when authenticated', async () => {
    // TODO: Mock/supress keycloak.protect() middleware
    const response = await request(app).get(`${basePath}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('should yield an unauthorized response', async () => {
    const response = await request(app).get(`${basePath}`);

    expect(response.statusCode).toBe(403);
    expect(response.body).toBeTruthy();
  });
});

describe(`POST ${basePath}`, () => {
  const saveSpy = jest.spyOn(dataService, 'save');
  let body;

  beforeEach(() => {
    saveSpy.mockReset();
    body = JSON.parse(JSON.stringify(validIPCPost));
  });

  it('should yield a created response', async () => {
    saveSpy.mockResolvedValue({});
    const response = await request(app).post(`${basePath}`).send(body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeTruthy();
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(body.business, body.contacts, body.ipcPlan);
  });

  it('should yield a validation failure', async () => {
    const email = 'badEmail';
    body.contacts[0].email = email;

    const response = await request(app).post(`${basePath}`).send(body);

    expect(response.statusCode).toBe(422);
    expect(response.body).toBeTruthy();
    expect(response.body.detail).toMatch('Validation failed');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].value).toMatch(email);
    expect(response.body.errors[0].message).toMatch(/email/);
    expect(saveSpy).toHaveBeenCalledTimes(0);
  });
});
