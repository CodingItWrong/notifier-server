const express = require('express');
const bodyParser = require('body-parser');
const testRoute = require('./test');
const githubRoute = require('./github');
const herokuRoute = require('./heroku');

const router = express.Router();
router.post('/test', bodyParser.text({ type: '*/*' }), testRoute);
router.post('/github', express.json(), githubRoute);
router.post('/heroku', express.json(), herokuRoute);

module.exports = router;
