const router = require('express').Router();

const log = require('npmlog');
const Problem = require('api-problem');
const validation = require('../../middleware/validation');

router.post('/', validation.validateIPC, async (req, res) => {

  try {
    return res.sendStatus(201);
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

module.exports = router;
