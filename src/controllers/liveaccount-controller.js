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

module.exports = { registerUser, loginUser };










// const cloudinary = require('cloudinary');
// const multer = require('multer');
// const LiveAccountControll = require("../model/LiveAccountSchema")

// const PostLive = async (req ,res) => {
//     const { name , email ,number  , trasitionid , amount  , password} = req.body;
//     try{
//         if(!name || !email || !number){
//             return res.status(402).json({message:"Please fill all the field"})
//         }
//         const isLive = await LiveAccountControll.findOne({email:email})
//         if(isLive){
//             return res.status(400).json({message: "User Already Exist"});
//         }
        
//         let result = await cloudinary.v2.uploader.upload(req.file.path)
//         console.log('Cloudinary Upload Result:', result);
//         const  imageUrl = result.secure_url;
//         const cloudinaryId = result.public_id;

//         const IsComp = await LiveAccountControll.create({
//             name,
//             email,
//             number,
//             trasitionid,
//             amount,
//             password : password,
//             imageFront: {
//                 imageUrl: imageUrl, 
//                 cloudinaryId: cloudinaryId
//             },
//         })
//         res.status(201).json({message:"Data send Succesfully" , data : IsComp})
//     }
//     catch(err){
//         return res.status(401).json({message:"Error send data" , Error : err})
//     }
// }

// const GetLive = async (req ,res) => {
//     try{
//         const allPerformer = await LiveAccountControll.find({});
//         res.status(201).json({message:"All Perfomer data" , val : allPerformer})
//     }
//     catch(err){
//         return res.status(500).json({ msg: "Error updating performance", error: err });        
//     }
// }

// const DeleteLive = async (req ,res) => {
//     const {id} = req.params;
//     try{
//         const isLive = await LiveAccountControll.findByIdAndDelete(id);
//         if(!isLive){
//             return res.status(404).json({message:"Competitor Not found"})
//         }
//         const result = await cloudinary.uploader.destroy(id);
//         console.log(result)
//         res.status(400).json({ message:"Live User Deleted Succesfully"})
//     }
//     catch(err){
//         console.log(err, "Error deleting");
//         res.status(400).json({ message:"Error Deleteting"})
//     }
// }

// module.exports = {PostLive , GetLive , DeleteLive }