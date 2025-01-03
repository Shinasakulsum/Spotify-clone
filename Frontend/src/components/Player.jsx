import React, { useContext } from 'react'
import { assets, } from '../assets/assests'
import { IoShuffle } from "react-icons/io5";
import { MdSkipPrevious, MdSkipNext, MdOutlineZoomOutMap } from "react-icons/md";
import { RxLoop } from "react-icons/rx";
import { FaPlay, FaPause } from "react-icons/fa"
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {

  const {track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } = useContext(PlayerContext);

  return track ? (
    <div className='fixed bottom-0 left-0 right-0 h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className='hidded lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <IoShuffle />
          <MdSkipPrevious onClick={previous} />
          {playStatus ?
            <FaPause onClick={pause} />:
            <FaPlay onClick={play} />
          }
          <MdSkipNext onClick={next} />
          <RxLoop />
        </div>
        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <MdOutlineZoomOutMap />
      </div>
    </div>
  ) : null
}

export default Player