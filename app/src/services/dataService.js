const constants = require('../components/constants');
const db = require('../models');

const transformBusiness = b => {
  const biz = {...b.dataValues};

  const contacts = biz.Contacts.map(c => {
    return {...c.dataValues};
  });
  delete biz.Contacts;

  const ipcPlan = {...biz.IPCPlan.dataValues};
  delete biz.IPCPlan;

  return {
    business: biz,
    contacts: contacts,
    ipcPlan: ipcPlan
  };
};

module.exports = {

  /**
   * @function getBusiness
   * @param {uuid} business id
   * Get a fully inflated businesses
   * @returns {object} An business if found, undefined otherwise
   */
  async getBusiness(id) {
    const businessObj = await db.Business.findByPk(id,
      {
        include: [
          {model: db.Contact},
          {model: db.IPCPlan}]
      }
    );
    return businessObj ? transformBusiness(businessObj) : undefined;
  },

  /**
   * @function getBusinesses
   * Returns all fully inflated businesses
   * @returns {object} An array of businesses
   */
  async getBusinesses() {
    const businessObjs = await db.Business.findAll(
      {
        include: [
          {model: db.Contact},
          {model: db.IPCPlan}
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      }
    );
    const result = businessObjs.map(b => {
      return transformBusiness(b);
    });

    return result;
  },

  /**
   * @function save
   * Writes the `business`, `contacts` and `ipcPlan` to database
   * @param {object} business Business data
   * @param {object[]} contacts Array of contact data
   * @param {object} ipcPlan IPC Plan data
   * @returns {object} Business Data
   */
  async save(business, contacts, ipcPlan) {
    let businessId;
    await db.sequelize.transaction(async t => {
      const businessObj = await db.Business.create(business, {transaction: t});
      businessId = businessObj.businessId;

      await db.Contact.bulkCreate(contacts.map(c => {
        return {...c, businessId: businessId};
      }), {transaction: t});

      if (ipcPlan.sleepingAreaType === constants.SLEEPING_AREA_TYPE_SINGLE) {
        ipcPlan.sharedSleepingPerRoom = 0;
        ipcPlan.sharedSleepingDistancing = false;
      }
      await db.IPCPlan.create(
        {...ipcPlan, businessId: businessId},
        {transaction: t});
    });

    return await this.getBusiness(businessId);
  }
};
