const log = require('npmlog');

const constants = require('../components/constants');
const db = require('../models');

module.exports = {
  /**
   * @function dumpAll
   * Returns the entire database contents as an array grouped by business objects
   * @returns {object} An array of submissions
   */
  dumpAll() {
    return db.sequelize.transaction(async t => {
      const businessObjs = await db.Business.findAll({}, { transaction: t });
      const contactObjs = await db.Contact.findAll({}, { transaction: t });
      const ipcPlanObjs = await db.IPCPlan.findAll({}, { transaction: t });

      return businessObjs.map(b => {
        return {
          business: b,
          contacts: contactObjs.filter(c => c.businessId === b.businessId),
          ipcPlan: ipcPlanObjs.find(ipc => ipc.businessId === b.businessId)
        };
      });
    });
  },

  /**
   * @function save
   * Writes the `business`, `contacts` and `ipcPlan` to database
   * @param {object} business Business data
   * @param {object[]} contacts Array of contact data
   * @param {object} ipcPlan IPC Plan data
   * @returns {object} Contains the primary key ids of the generated objects
   */
  async save(business, contacts, ipcPlan) {
    const results = {};
    await db.sequelize.transaction(async t => {
      const businessObj = await db.Business.create(business, { transaction: t });
      results.businessId = businessObj.businessId;


      const contactObjs = await db.Contact.bulkCreate(contacts.map(c => {
        return { ...c, businessId: businessObj.businessId };
      }), { transaction: t });
      results.contactIds = contactObjs.map(c => c.dataValues.contactId);

      if (ipcPlan.sleepingAreaType === constants.SLEEPING_AREA_TYPE_SINGLE) {
        ipcPlan.sharedSleepingPerRoom = 0;
        ipcPlan.sharedSleepingDistancing = false;
      }
      const ipcPlanObj = await db.IPCPlan.create(
        { ...ipcPlan, businessId: businessObj.businessId },
        { transaction: t });
      results.ipcPlanId = ipcPlanObj.ipcPlanId;
    });

    log.verbose('dataService.save', `businessId: ${results.businessId}`);
    log.verbose('dataService.save', `contactIds: ${results.contactIds}`);
    log.verbose('dataService.save', `ipcPlanId: ${results.ipcPlanId}`);

    return results;
  }
};
