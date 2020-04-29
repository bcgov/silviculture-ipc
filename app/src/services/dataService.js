const log = require('npmlog');
const Problem = require('api-problem');

const constants = require('../components/constants');
const db = require('../models');

module.exports = {

  async getInspectionStatuses(ipcPlanId) {
    try {
      const ipcObj = await db.InspectionStatus.findAll(
        {
          where: { ipcPlanId: ipcPlanId},
          order: [
            ['createdAt', 'DESC']
          ]
        },
        {
          rejectOnEmpty: true
        }
      );
      return ipcObj;
    } catch (err) {
      // api problems should be handled in a layer above, but we have no controller... coming direct to data layer.
      if (db.isNotFoundError(err)) {
        throw new Problem(404, {detail: `Inspection Statuses not found for IPC Plan ID ${ipcPlanId}`});
      } else if (db.isSyntaxError(err)) {
        throw new Problem(422, {detail: `Inspection Statuses fetch for IPC Plan ID ${ipcPlanId} `});
      }
    }
  },

  async saveInspectionStatus(ipcPlanId, createdBy, obj) {
    try {
      let inspectionStatusObj;
      await db.sequelize.transaction(async t => {
        inspectionStatusObj = await db.InspectionStatus.create({...obj, createdBy: createdBy, ipcPlanId: ipcPlanId}, {transaction: t});
      });

      return inspectionStatusObj;
    } catch (e) {
      log.error('dataService.saveInspectionStatus', e.message);
    }
  },

  async getIPCPlan(id) {
    try {
      const ipcObj = await db.IPCPlan.findByPk(id,
        {
          order: [
            [db.InspectionStatus, 'createdAt', 'DESC']
          ],
          include: [
            {
              model: db.Business,
            },
            {
              model: db.Contact,
            },
            {
              model: db.Location,
            },
            {
              model: db.InspectionStatus
            }],

          rejectOnEmpty: true
        }
      );
      return ipcObj;
    } catch (err) {
      // api problems should be handled in a layer above, but we have no controller... coming direct to data layer.
      if (db.isNotFoundError(err)) {
        throw new Problem(404, {detail: `IPC Plan ID ${id} not found`});
      } else if (db.isSyntaxError(err)) {
        throw new Problem(422, {detail: `IPC Plan ID ${id} `});
      }
    }
  },

  async getIPCPlans() {
    const ipcObjs = await db.IPCPlan.findAll(
      {
        order: [
          ['createdAt', 'DESC'],
          [db.InspectionStatus, 'createdAt', 'DESC']
        ],
        include: [
          {
            model: db.Business,
          },
          {
            model: db.Contact,
          },
          {
            model: db.Location,
          },
          {
            model: db.InspectionStatus
          }]
      }
    );
    return ipcObjs;
  },

  async getIPCPlansMeta() {
    const ipcObjs = await db.IPCPlan.findAll(
      {
        order: [
          ['createdAt', 'DESC'],
          [db.InspectionStatus, 'createdAt', 'DESC']
        ],
        attributes:['ipcPlanId', 'createdAt'],
        include: [
          {
            model: db.Business,
            attributes: ['name']
          },
          {
            model: db.InspectionStatus,
            attributes: ['status', 'grade', 'createdAt', 'inspectorName', 'inspectorEmail']
          }]
      }
    );
    return ipcObjs;
  },

  async save(business, contacts, ipcPlan, location) {
    try {
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

        await db.InspectionStatus.create({status: 'Submitted', createdBy: 'system', ipcPlanId: ipcPlanId}, {transaction: t});
      });

      return await this.getIPCPlan(ipcPlanId);
    } catch (e) {
      log.error('dataService.save', e.message);
    }
  }
};
