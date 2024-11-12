const cloudinary = require('cloudinary');
const multer = require('multer');
const CompetitorControll = require("../model/CompetitorSchema")

const PostCompetitor = async (req ,res) => {
    const { name , email ,number , range , trasitionid , amount } = req.body;
    
    try{ 
        if(!name || !email || !number || !range){
            return res.status(402).json({message:"Please fill all the field"})
        }
        const exisitngUser = await CompetitorControll.findOne({email : email });
        if(exisitngUser){
            return res.status(400).json({message: "User email Already Exist"});
        }
        
        
        let result = await cloudinary.v2.uploader.upload(req.file.path)
        console.log('Cloudinary Upload Result:', result);
        const  imageUrl = result.secure_url;
        const cloudinaryId = result.public_id;
        const competitor = await CompetitorControll.create({
            name,
            email,
            number,
            range,
            trasitionid,
            amount,
            imageFront: {
                imageUrl: imageUrl, 
                cloudinaryId: cloudinaryId
            },
        });
        res.status(201).json({message:"Data send Succesfully" , data : competitor})
    }

    catch(err){
        return res.status(401).json({message:"Error send data" , Error : err})
    }
}

const GetCompetitor = async (req ,res) => {
    try{
        const getComp = await CompetitorControll.find({});
        res.status(201).json({message:"Data Send Succesfully" ,getComp })
    }
    catch(err){
        return res.status(404).json({message:"Error fetching data" , Error : err})
    }
}

const deleteCompetitor = async (req , res) => {
    const {id} = req.params;
    try{
        const isComp = await CompetitorControll.findByIdAndDelete(id);
        if(!isComp){
            return res.status(404).json({message:"Competitor Not found"})
        }
        const result = await cloudinary.uploader.destroy(id);
        console.log(result)
        res.status(200).json({ message:"Competitor Deleted Succesfully"})
    }catch (err) {
        console.log(err, "Error deleting");
        res.status(400).json({ message:"Error Deleting"})
    }
}

module.exports = { PostCompetitor ,GetCompetitor , deleteCompetitor }