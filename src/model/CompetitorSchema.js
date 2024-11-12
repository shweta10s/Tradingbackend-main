const mongoose = require("mongoose");

const CompetitorSchema = mongoose.Schema({
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
    range:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    trasitionid:{
        type:String,
        required:false
    },
    imageFront :{
        imageUrl: { type: String, required: false },
        cloudinaryId: { type: String, required: false }
    },
})

const competitormodal = mongoose.model("competitor", CompetitorSchema);

module.exports = competitormodal;