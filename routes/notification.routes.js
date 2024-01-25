const {
    pushNotification
} = require('../controllers/notification.controller');

const router = require('express').Router();

router.post('/push', pushNotification);

module.exports = router;