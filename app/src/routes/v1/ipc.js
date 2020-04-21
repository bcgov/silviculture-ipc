const config = require('config');
const log = require('npmlog');
const Problem = require('api-problem');
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

const validation = require('../../middleware/validation');
const dataService = require('../../services/dataService');

const ipcRateLimiter = rateLimit({
  windowMs: config.get('server.rateLimit.ipc.windowMs'),
  max: config.get('server.rateLimit.ipc.max')
});

router.post('/', ipcRateLimiter, validation.validateIPC, async (req, res) => {
  try {
    await dataService.save(req.body.business, req.body.contacts, req.body.ipcPlan);
    return res.sendStatus(201);
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

module.exports = router;
