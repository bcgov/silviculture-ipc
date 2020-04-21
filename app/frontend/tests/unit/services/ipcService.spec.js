import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ipcService from '@/services/ipcService';
import { ApiRoutes } from '@/utils/constants';

const mockInstance = axios.create();
const mockAxios = new MockAdapter(mockInstance);

jest.mock('@/services/interceptors', () => {
  return {
    appAxios: () => mockInstance
  };
});

describe('getAllIPCData', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls the ipc get endpoint', async () => {
    mockAxios.onGet(ApiRoutes.HEALTH).reply(200, []);

    const result = await ipcService.getAllIPCData();
    expect(result).toBeTruthy();
    expect(result.data).toEqual([]);
    expect(mockAxios.history.get.length).toBe(1);
  });
});

describe('sendIPCContent', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls the ipc post endpoint', async () => {
    mockAxios.onPost(ApiRoutes.HEALTH).reply(201, {});

    const result = await ipcService.sendIPCContent({});
    expect(result).toBeTruthy();
    expect(result.data).toEqual({});
    expect(mockAxios.history.post.length).toBe(1);
  });
});
