const router = require('express').Router();

const log = require('npmlog');
const Problem = require('api-problem');

router.post('/', async (req, res) => {

  try {
    return res.sendStatus(200);
  } catch (error) {
    log.error(error);
    return new Problem(500, { detail: error.message }).send(res);
  }
});

module.exports = router;
