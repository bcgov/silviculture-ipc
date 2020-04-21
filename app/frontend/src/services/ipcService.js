import { appAxios } from '@/services/interceptors';
import { ApiRoutes } from '@/utils/constants';

export default {
  /**
   * @function getAllIPCData
   * Fetch the contents of all IPC form submissions
   * @returns {Promise} An axios response
   */
  getAllIPCData() {
    return appAxios().get(ApiRoutes.IPC);
  },

  /**
   * @function sendIPCContent
   * Sends an IPC form submission
   * @param {object} content An object with business, contacts and ipcPlan attributes
   * @returns {Promise} An axios response
   */
  sendIPCContent(content) {
    return appAxios().post(ApiRoutes.IPC, content);
  }
};
