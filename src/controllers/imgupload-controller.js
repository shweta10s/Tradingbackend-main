const cloudinary = require('cloudinary');


const PostImg = async ( req ,res) => {
    try{
        console.log(req.file)
        let result = await cloudinary.v2.uploader.upload(req.file.path)
        console.log(result);
        res.status(201).send({message:"file upload succesfully" , result})
    }catch(err){
        console.log(err , "Error hai")
    }
}
const DeleteImg = async (req ,res) => {
    const {public_id} = req.body;
    try{
        const result = await cloudinary.uploader.destroy(public_id);
        console.log(result)
        if (result.result === 'ok') {
            res.status(200).send({ message: "Image deleted successfully" });
        } else {
            return res.status(404).send({ message: "Image not found" });
        }
    }catch (err) {
        console.log(err, "Error deleting image");
        return res.status(500).send({ message: "Error deleting image", error: err });
    }
}


module.exports = {PostImg , DeleteImg};