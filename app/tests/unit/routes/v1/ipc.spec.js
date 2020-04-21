const request = require('supertest');

const helper = require('../../../common/helper');
const router = require('../../../../src/routes/v1/ipc');
const validIPCPost = require('../../../fixtures/validIPCPost.json');

// Simple Express Server
const basePath = '/api/v1/ipc';
const app = helper.expressHelper(basePath, router);
helper.logHelper();

describe(`POST ${basePath}`, () => {
  let body;

  beforeEach(() => {
    body = JSON.parse(JSON.stringify(validIPCPost));
  });

  it('should yield a created response', async () => {
    //put this back in when we have a data service...
    //const response = await request(app).post(`${basePath}`).send(body);

    //expect(response.statusCode).toBe(201);
    //expect(response.body).toBeTruthy();
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
  });
});
