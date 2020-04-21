const log = require('npmlog');

const constants = require('../components/constants');
const db = require('../models');

module.exports = {
  dumpAll() {
    return db.sequelize.transaction(async t => {
      const businessObjs = await db.Business.findAll({}, { transaction: t });
      const contactObjs = await db.Contact.findAll({}, { transaction: t });
      const ipcPlanObjs = await db.IPCPlan.findAll({}, { transaction: t });

      return businessObjs.map(b => {
        const record = {
          business: b,
          contacts: contactObjs.filter(c => c.businessId === b.businessId),
          ipcPlan: ipcPlanObjs.find(ipc => ipc.businessId === b.businessId)
        };

        return record;
      });
    });
  },

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

    log.debug('dataService.save', `businessId: ${results.businessId}`);
    log.debug('dataService.save', `contactIds: ${results.contactIds}`);
    log.debug('dataService.save', `ipcPlanId: ${results.ipcPlanId}`);

    return results;
  }
};
