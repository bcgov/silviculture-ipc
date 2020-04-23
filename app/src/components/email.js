const axios = require('axios');
const config = require('config');
const fs = require('fs');
const log = require('npmlog');

const utils = require('./utils');

const apiEndpoint = config.get('serviceClient.commonServices.ches.endpoint');
const tokenEndpoint = config.get('serviceClient.commonServices.tokenEndpoint');
const username = config.get('serviceClient.commonServices.username');
const password = config.get('serviceClient.commonServices.password');

const emailBody = fs.readFileSync('src/assets/silvIPC_emailTemplate.html', 'utf8');

const email = {
  /**
   * @function sendReceipt
   * Sends an email receipt through CHES
   * @param {object} context A freeform key-value pair object
   */
  sendReceipt: async context => {
    try {
      const token = await utils.getKeyCloakToken(username, password, tokenEndpoint);
      const response = await axios.post(apiEndpoint + '/v1/emailMerge', {
        body: emailBody,
        bodyType: 'html',
        contexts: [
          {
            context: context,
            to: ['NR.CommonServiceShowcase@gov.bc.ca'],
          }
        ],
        from: 'NR.CommonServiceShowcase@gov.bc.ca',
        priority: 'high',
        subject: 'Silviculture IPC Form Accepted'
      }, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      });

      if (response.status == 201) {
        return response.data;
      } else {
        throw new Error(`Error from POST to CHES. Response Code: ${response.status}`);
      }
    } catch (error) {
      log.error('email.sendRequest', error.message);
      throw new Error(`Error calling email endpoint. Error: ${error.message}`);
    }
  },

  /**
   * @function sendRequest
   * Sends an email request through CHES
   * @param {string} comments The sender's unformatted comment text
   * @param {string} from The sender's registered email
   * @param {string} idir The sender's IDIR
   */
  sendRequest: async (comments, from, idir) => {
    try {
      const token = await utils.getKeyCloakToken(username, password, tokenEndpoint);
      const response = await axios.post(apiEndpoint + '/v1/email', {
        body: `<p>Message from Silviculture IPC</p> <p><strong>User comments:</strong><br/>${comments}`,
        bodyType: 'html',
        from: from,
        priority: 'high',
        to: ['NR.CommonServiceShowcase@gov.bc.ca'],
        subject: `Silviculture IPC Message from ${idir}`
      }, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      });

      if (response.status == 201) {
        return response.data;
      } else {
        throw new Error(`Error from POST to CHES. Response Code: ${response.status}`);
      }
    } catch (error) {
      log.error('email.sendRequest', error.message);
      throw new Error(`Error calling email endpoint. Error: ${error.message}`);
    }
  },
};

module.exports = email;
