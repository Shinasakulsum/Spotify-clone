import React, { createContext, useEffect, useRef, useState } from "react";
// import { songData } from "../assets/assests";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const url = 'http://localhost:4000';

    
    const[songData, setSongData] = useState([]);
    const[albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        const song = songData.find(item => item._id === id);
        if (song) {
            setTrack(song);
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const previous = async () => {
        const currentIndex = songData.findIndex(item => item._id === track._id);
        if (currentIndex > 0) {
            const prevSong = songData[currentIndex - 1];
            setTrack(prevSong);
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        const currentIndex = songData.findIndex(item => item._id === track._id);
        if (currentIndex < songData.length - 1) {
            const nextSong = songData[currentIndex + 1];
            setTrack(nextSong);
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = async (e) => {
        const percent = e.nativeEvent.offsetX / seekBg.current.offsetWidth;
        seekBar.current.style.width = percent * 100 + '%';
        audioRef.current.currentTime = percent * audioRef.current.duration;
    }

    const getSongsData = async () => {
        try {
            const res = await axios.get(`${url}/api/song/list`);
            setSongData(res.data.songs);
            setTrack(res.data.songs[0]);
        } catch (error) {
            
        }
    }

    const getAlbumsData = async () => {
        try {
            const res = await axios.get(`${url}/api/album/list`);
            setAlbumsData(res.data.albums);

        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (audioRef.current) {
            const handleTimeUpdate = () => {
                const currentTime = Math.floor(audioRef.current.currentTime);
                const duration = Math.floor(audioRef.current.duration);

                seekBar.current.style.width = (currentTime / duration) * 100 + '%';

                setTime({
                    currentTime: {
                        second: currentTime % 60,
                        minute: Math.floor(currentTime / 60)
                    },
                    totalTime: {
                        second: duration % 60,
                        minute: Math.floor(duration / 60)
                    }
                });
            };

            audioRef.current.ontimeupdate = handleTimeUpdate;

            // Clean up the effect
            return () => {
                if (audioRef.current) {
                    audioRef.current.ontimeupdate = null;
                }
            };
        }
    }, [audioRef, track]);

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus,setPlayStatus,
        time, setTime,
        play,pause,
        playWithId,
        previous,next,
        seekSong,
        songData,albumsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;