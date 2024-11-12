const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const LiveSchema = mongoose.Schema({
    imageFront :{
        imageUrl: { type: String, required: false },
        cloudinaryId: { type: String, required: false }
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        default:0
    },
    trasitionid:{
        type:String,
        default:null
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isApproved:{            ///admin approval field
        type:Boolean,
        default:false,
    },
    canTrade:{                  ///ability to trade
        type:Boolean,
        default:false
    },
},{ timestamps: true });

LiveSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

LiveSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const livemodal = mongoose.model("liveaccount", LiveSchema);

module.exports = livemodal;
