const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, getAllUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleWare');

// POST - Register User or Admin
router.post('/register', registerUser);
router.get('/register', getAllUser);

// POST - Login
router.post('/login', loginUser);



// GET - Get User Profile
router.get('/profile', protect, getUserProfile);

// PUT - Update User Profile
router.put('/update-profile', protect, updateUserProfile);

module.exports = router;