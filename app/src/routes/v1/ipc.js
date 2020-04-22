const config = require('config');
const log = require('npmlog');
const Problem = require('api-problem');
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

const keycloak = require('../../components/keycloak');
const validation = require('../../middleware/validation');
const dataService = require('../../services/dataService');
const transformService = require('../../services/transformService');

const ipcRateLimiter = rateLimit({
  windowMs: config.get('server.rateLimit.ipc.windowMs'),
  max: config.get('server.rateLimit.ipc.max')
});

router.get('/', keycloak.protect(), async (req, res) => {
  try {
    if (req.query.meta) {
      const result = await dataService.getIPCPlansMeta();
      return res.status(200).json(transformService.transformIPCPlansMeta(result));
    } else {
      const result = await dataService.getIPCPlans();
      return res.status(200).json(transformService.transformIPCPlans(result));
    }
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

router.post('/', ipcRateLimiter, validation.validateIPC, async (req, res) => {
  try {
    const result = await dataService.save(req.body.business, req.body.contacts, req.body.ipcPlan);
    return res.status(201).json(transformService.transformIPCPlan(result));
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

router.get('/:ipcPlanId', ipcRateLimiter, async (req, res) => {
  try {
    const result = await dataService.getIPCPlan(req.params.ipcPlanId);
    return res.status(200).json(transformService.transformIPCPlan(result));
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

module.exports = router;
