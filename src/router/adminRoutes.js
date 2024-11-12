const express = require('express');
const router = express.Router();
const { approveUser, rejectUser, approvePayment, userData } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleWare');

// Admin - Approve User
router.put('/approve/:userId', protect, admin, approveUser);


// Admin - Reject User
router.put('/reject/:userId', protect, admin, rejectUser);


// PUT - Admin approves user payment
router.put('/approve-payment/:userId', protect, admin, approvePayment);

//Get admin Api 
router.get("/user", protect, admin, userData );

module.exports = router;