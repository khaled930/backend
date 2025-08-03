const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('../middleware/auth');
const { listUsers, toggleUserStatus } = require('../controllers/adminController');

router.use(authorizeAdmin);

router.get('/users', listUsers);
router.patch('/users/:id/toggle', toggleUserStatus);

module.exports = router;
