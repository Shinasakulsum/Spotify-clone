import React from 'react'
import { MdAddCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw]'>
        <img className='mt-5 w-[max(10vw,100px)] hidded sm:block' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png" alt="" />
        <img className='mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslcO84eWfXP_4Ucd4Yfz6B8uqJmHaTo0iTw&s" alt="" />

        <div className="flex flex-col gap-5 mt-10">
            <NavLink to='/add-song' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium">
                <MdAddCircle className='w-5'/>
                <p className='hidden sm:block'>Add Song</p>
            </NavLink>

            <NavLink to='/list-song' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium">
                <MdAddCircle className='w-5'/>
                <p className='hidden sm:block'>List Song</p>
            </NavLink>

            <NavLink to='/add-album' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium">
                <MdAddCircle className='w-5'/>
                <p className='hidden sm:block'>Add Album</p>
            </NavLink>

            <NavLink to='/list-album' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium">
                <MdAddCircle className='w-5'/>
                <p className='hidden sm:block'>List Album</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar