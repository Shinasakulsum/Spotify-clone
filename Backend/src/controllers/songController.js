import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

const addSong = async (req, res) => {
    try {
        console.log('addSong function called');
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        console.log('Request body:', req.body);
        console.log(name, desc, album);

        if (!req.files || !req.files.audio || !req.files.image) {
            console.log('Files are missing in the request');
            return res.status(400).json({ message: 'Audio and image files are required' });
        }

        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        console.log('Audio file:', audioFile);
        console.log('Image file:', imageFile);
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        console.log('Upload results:', audioUpload, imageUpload);
        console.log(name, desc, album, audioUpload, imageUpload);

        const songData = {
            name,
            desc,
            album,
            audioUrl: audioUpload.secure_url,
            imageUrl: imageUpload.secure_url,
            duration
        };

        const song = songModel(songData);
        await song.save();
        res.json({ success: true, message: "Song Added", song: songData });


    } catch (error) {
        console.error('Error in addSong:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });

    } catch (error) {
        res.json({ success: false });
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Song deleted' });
    }
    catch (error) {
        res.json({ success: false, message: 'Internal server error' });
    }
}

export { addSong, listSong, removeSong };