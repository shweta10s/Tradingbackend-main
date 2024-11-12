const express = require('express');
const router = express.Router();
const { requestWithdrawal, approveWithdrawal } = require('../controllers/withdrawalController');
const { protect, admin } = require('../middlewares/authMiddleWare');

// User - Request Withdrawal
router.post('/request', protect, requestWithdrawal);

// Admin - Approve Withdrawal
router.put('/approve/:userId', protect, admin, approveWithdrawal);

module.exports = router;