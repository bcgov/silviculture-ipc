const emailRouter = require('express').Router();
const Problem = require('api-problem');

const email = require('../../components/email');
const validation = require('../../middleware/validation');

emailRouter.post('/', validation.validateEmail, async (req, res) => {
  try {
    const result = await email.sendRequest(req.body.comments, req.body.from, req.body.idir);
    return res.status(201).json(result);
  } catch (error) {
    return new Problem(500, { detail: error.message }).send(res);
  }
});

module.exports = emailRouter;
