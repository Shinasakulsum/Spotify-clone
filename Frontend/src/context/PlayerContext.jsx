import React, { createContext, useEffect, useRef, useState } from "react";
import { songData } from "../assets/assests";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

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
        // await setTrack(songData[id]);
        // await audioRef.current.play();
        // setPlayStatus(true);
        await songData.map((item)=>{
            if(id === item._id){
                setTrack(item);
            }
        })

        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        // if (track.id>0){
        //     await setTrack(songData[track.id-1]);
        //     await audioRef.current.play();
        //     setPlayStatus(true);
        // }
        songData.map(async (item,index) => {
            if(track._id === item._id && index >0){
                await setTrack(songData[index-1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    } 

    const next = async () => {
        // if (track.id < songData.length-1){
        //     await setTrack(songData[track.id+1]);
        //     await audioRef.current.play();
        //     setPlayStatus(true);
        // }
        songData.map(async (item,index) => {
            if(track._id === item._id && index < songData.length){
                await setTrack(songData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    } 

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
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime) / Math.floor(audioRef.current.duration)) * 100 + '%';
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        },1000)
    },[audioRef])

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    })

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