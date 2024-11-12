const cloudinary = require('cloudinary');
const multer = require('multer');
const User = require('../model/LiveAccountSchema');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
};

// Register User or Admin
const registerUser = async (req, res) => {
    const { name, email, number, password, isAdmin } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        return res.status(400).send('User already exists');
    }
    let result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log('Cloudinary Upload Result:', result);
    const  imageUrl = result.secure_url;
    const cloudinaryId = result.public_id;
    const user = await User.create({
        name,
        email,
        number,
        password,
        isAdmin,
        imageFront: {
            imageUrl: imageUrl, 
            cloudinaryId: cloudinaryId
        },
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        return res.status(400).send('Invalid user data');
    }
};

// Login User or Admin
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isApproved: user.isApproved,
            canTrade: user.canTrade,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        return res.status(400).send('Invalid email or password');
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (user) {
            res.json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    isAdmin: user.isAdmin,
                    amount: user.amount
                    // Add other fields as needed
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// controllers/authController.js

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.number = req.body.phone || user.number;
            user.email = req.body.email || user.email;
            // Add other fields as needed

            const updatedUser = await user.save();

            res.json({
                message: 'Profile updated successfully',
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    number: updatedUser.number,
                    // Add other fields as needed
                    
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllUser = async (req ,res) => {
    try{
        const isUser = await User.find();
        res.status(200).json({data:isUser})
    }
    catch(err){
        return res.status(400).json({message:"Error fetching data" , data:err})
    }
}


module.exports = { registerUser, loginUser , getUserProfile ,updateUserProfile, getAllUser };
