import { appAxios } from '@/services/interceptors';
import { ApiRoutes } from '@/utils/constants';

export default {
  /**
   * @function sendRegistrationEmail
   * Sends an application registration request email
   * @param {object} content An object with applicationAcronym, comments, from and idir attributes
   * @returns {Promise} An axios response
   */
  sendRegistrationEmail(content) {
    return appAxios().post(ApiRoutes.EMAIL, content);
  }
};
