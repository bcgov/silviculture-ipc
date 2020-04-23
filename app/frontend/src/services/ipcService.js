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
 * @function getAllIPCMetaData
 * Fetch only the basic meta data of all IPC form submissions
 * @returns {Promise} An axios response
 */
  getAllIPCMetaData() {
    return appAxios().get('/ipc?meta=true');
  },

  /**
   * @function sendIPCContent
   * Sends an IPC form submission
   * @param {object} content An object with business, contacts and ipcPlan attributes
   * @returns {Promise} An axios response
   */
  sendIPCContent(content) {
    return appAxios().post(ApiRoutes.IPC, content);
  },

  /**
   * @function getIPCContent
   * Fetch the contents of a single IPC form submission
   * @param {string} the guid of a submitted ipcplan from the database
   * @returns {Promise} An axios response
   */
  getIPCContent(ipcPlanId) {
    return appAxios().get('/ipc/' + ipcPlanId);
  },

};
