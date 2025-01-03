import {v2 as cloudinary} from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {

    try {
        console.log('addAlbum function called');
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        console.log('Request body:', req.body);

        if (!req.file) {
            console.log('Image file is missing in the request');
            return res.status(400).json({ message: 'Image file is required' });
        }

        const imageFile = req.file;
        console.log('Image file:', imageFile);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        console.log('Image upload result:', imageUpload);

        const album = new albumModel({
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        });
        await album.save();

        res.json({success: true, message:"Album saved successfully"});
    }catch(err){
        res.json({success: false,});
    }

}

const listAlbums = async (req, res) => {

    try{
        const allAlbums = await albumModel.find({});
        res.json({success: true, albums: allAlbums});
    }
    catch(err){
        res.json({success: false,});
    }
}

const removeAlbum = async (req, res) => {
    try{
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Album deleted successfully"});
    }
    catch(err){
        res.json({success: false,});
    }
}

export {addAlbum, listAlbums, removeAlbum};