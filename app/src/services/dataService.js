const constants = require('../components/constants');
const db = require('../models');

module.exports = {

  /**
   * @function getIPCPlan
   * @param {uuid} ipcPlan id
   * Get a IPC Plan and related business/contact info
   * @returns {object} A plan if id found, undefined otherwise
   */
  async getIPCPlan(id) {
    const ipcObj = await db.IPCPlan.findByPk(id,
      {
        include: { all: true, nested: true }
      }
    );
    return ipcObj;
  },

  /**
   * @function getIPCPlans
   * Get all IPC Plans and related business/contact info
   * @returns {object} array of ICP Plans
   */
  async getIPCPlans() {
    const ipcObjs = await db.IPCPlan.findAll(
      {
        include: { all: true, nested: true }
      }
    );
    return ipcObjs;
  },

  /**
   * @function getIPCPlansMeta
   * Get limited data for all IPCPlans
   * @returns {object} array of ICP Plans metadata
   */
  async getIPCPlansMeta() {
    const ipcObjs = await db.IPCPlan.findAll(
      {
        attributes:['ipcPlanId', 'createdAt'],
        include: {
          model: db.Business,
          attributes: ['name']
        },
        order: [
          ['createdAt', 'DESC']
        ]
      }
    );
    return ipcObjs;
  },

  async save(business, contacts, ipcPlan, location) {
    let ipcPlanId;
    await db.sequelize.transaction(async t => {

      if (ipcPlan.sleepingAreaType === constants.SLEEPING_AREA_TYPE_SINGLE) {
        ipcPlan.sharedSleepingPerRoom = 0;
        ipcPlan.sharedSleepingDistancing = false;
      }

      const ipcPlanObj = await db.IPCPlan.create({...ipcPlan}, {transaction: t});
      ipcPlanId = ipcPlanObj.ipcPlanId;

      await db.Business.create({...business, ipcPlanId: ipcPlanId}, {transaction: t});
      await db.Location.create({...location, ipcPlanId: ipcPlanId}, {transaction: t});

      await db.Contact.bulkCreate(contacts.map(c => {
        return {...c, ipcPlanId: ipcPlanId};
      }), {transaction: t});
    });

    return await this.getIPCPlan(ipcPlanId);
  }
};
