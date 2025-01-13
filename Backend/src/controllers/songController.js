import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: 'uploads/' });

const convertDurationToSeconds = (duration) => {
    const minutes = Math.floor(duration / 60); 
    const seconds = Math.floor(duration % 60);
    return minutes * 60 + seconds;
};

const removeLocalFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to remove local file:', err);
        } else {
            console.log(`Successfully removed file: ${filePath}`);
        }
    });
};


const addSong = async (req, res) => {
    try {
        console.log('addSong function called');
        const { name, desc, album } = req.body;
        console.log('Request body:', req.body);

        if (!req.files || !req.files.audio || !req.files.image) {
            console.log('Files are missing in the request');
            return res.status(400).json({ message: 'Audio and image files are required' });
        }

        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        console.log('Audio file:', audioFile);
        console.log('Image file:', imageFile);

        // Upload files to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        if (!audioUpload || !imageUpload) {
            throw new Error('Cloudinary upload failed');
        }
        

        // Duration calculation: Convert duration from Cloudinary (in seconds)
        const durationInSeconds = convertDurationToSeconds(audioUpload.duration);

        const songData = {
            name,
            desc,
            album,
            audioUrl: audioUpload.secure_url,
            imageUrl: imageUpload.secure_url,
            duration: durationInSeconds // Store the duration in seconds
        };

        // Log the songData before saving
        console.log('Song data to save:', songData);

        const song = await songModel.create(songData);

        // Clean up local files
        removeLocalFile(audioFile.path);
        removeLocalFile(imageFile.path);

        // Respond with the saved song data
        res.status(201).json({ success: true, message: "Song Added", song });
    } catch (error) {
        console.error('Error in addSong:', error);
        console.error(error.stack);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



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