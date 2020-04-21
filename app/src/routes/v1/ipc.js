const router = require('express').Router();

const Constants = require('../../components/constants');
const log = require('npmlog');
const Problem = require('api-problem');
const validation = require('../../middleware/validation');

const db = require('../../models');

router.post('/', validation.validateIPC, async (req, res) => {

  try {
    const body = req.body;
    const business = body.business;
    const contacts = body.contacts;
    const contact = contacts[0];
    const ipcPlan = body.ipcPlan;

    const biz = await db.Business.create(business);
    log.debug('ipc', `created business id = ${biz.businessId}`);
    contact.businessId = biz.businessId;
    const kontakt = await db.Contact.create(contact);
    log.debug('ipc', `created contact id = ${kontakt.contactId}`);
    ipcPlan.businessId = biz.businessId;

    // simple bizness logic...
    if (ipcPlan.sleepingAreaType === Constants.SLEEPING_AREA_TYPE_SINGLE) {
      ipcPlan.sharedSleepingPerRoom = 0;
      ipcPlan.sharedSleepingDistancing = false;
    }
    const ipsee = await db.IPCPlan.create(ipcPlan);
    log.debug('ipc', `created ipcPlan id = ${ipsee.ipcPlanId}`);


    return res.sendStatus(201);
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

module.exports = router;
