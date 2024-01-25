const {getStatistiaue} = require('../controllers/data.controller');

const router = require('express').Router();

router.get('/', getStatistiaue);

module.exports = router;