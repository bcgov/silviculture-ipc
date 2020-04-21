const { dataService } = require('../services');

const ipc = {

  /**
   * @function getAllSubmissions
   * Aggregates all form submissions
   * @returns {object[]} An array of submissions
   */
  getAllSubmissions: async () => {

    // get data from service layer
    const submissionsData = await Promise.all([
      dataService.getAllSubmissionsData()
    ]);

    return submissionsData;
  },

};

module.exports = ipc;
