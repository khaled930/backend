const express = require('express');
const router = express.Router();
const { getMyBalance, getMyTransfers, getMyIncomingTransfers } = require('../controllers/userController');

router.get('/balance', getMyBalance);
router.get('/transfers', getMyTransfers);
router.get('/incoming', getMyIncomingTransfers);

module.exports = router;
