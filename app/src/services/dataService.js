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
        include: {
          model: db.Business,
          include: {model: db.Contact}
        }
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
        include: {
          model: db.Business,
          include: {model: db.Contact}
        }
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

  /**
   * @function save
   * Writes the `business`, `contacts` and `ipcPlan` to database
   * @param {object} business Business data
   * @param {object[]} contacts Array of contact data
   * @param {object} ipcPlan IPC Plan data
   * @returns {object} IPC Plan
   */
  async save(business, contacts, ipcPlan) {
    let ipcPlanId;
    await db.sequelize.transaction(async t => {
      const businessObj = await db.Business.create(business, {transaction: t});

      await db.Contact.bulkCreate(contacts.map(c => {
        return {...c, businessId: businessObj.businessId};
      }), {transaction: t});

      if (ipcPlan.sleepingAreaType === constants.SLEEPING_AREA_TYPE_SINGLE) {
        ipcPlan.sharedSleepingPerRoom = 0;
        ipcPlan.sharedSleepingDistancing = false;
      }
      const ipcPlanObj = await db.IPCPlan.create(
        {...ipcPlan, businessId: businessObj.businessId},
        {transaction: t});
      ipcPlanId = ipcPlanObj.ipcPlanId;
    });

    return await this.getIPCPlan(ipcPlanId);
  }
};
