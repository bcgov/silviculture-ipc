const config = require('config');
const log = require('npmlog');
const Problem = require('api-problem');
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

const keycloak = require('../../components/keycloak');
const validation = require('../../middleware/validation');
const dataService = require('../../services/dataService');

const ipcRateLimiter = rateLimit({
  windowMs: config.get('server.rateLimit.ipc.windowMs'),
  max: config.get('server.rateLimit.ipc.max')
});

router.get('/', keycloak.protect(), async (_req, res) => {
  try {
    const result = await dataService.getBusinesses();
    return res.status(200).json(result);
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

router.post('/', ipcRateLimiter, validation.validateIPC, async (req, res) => {
  try {
    const result = await dataService.save(req.body.business, req.body.contacts, req.body.ipcPlan);
    return res.status(201).json(result);
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

module.exports = router;
