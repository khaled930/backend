const express = require('express');
const router = express.Router();
const { transfer } = require('../controllers/transactionController');

router.post('/send', transfer);

module.exports = router;
