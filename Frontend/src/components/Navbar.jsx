import React, { useEffect, useState } from 'react';
import 'lord-icon-element';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.lordicon.com/xdjxvujz.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const navigate = useNavigate();

    return (
        <div className='flex bg-black p-2 items-center w-full fixed top-0 justify-between'>
            <div className='flex items-center space-x-4'>
                <img
                    src="https://www.citypng.com/public/uploads/preview/spotify-white-logo-symbol-icon-hd-png-11661570403q5drcznuwu.png"
                    alt="Spotify Logo"
                    className='w-16 h-14 border-2 border-black p-2 mt-0 rounded-full'
                />
            </div>
            <div className='flex items-center justify-center w-full relative space-x-4'>
                <div onClick={()=> navigate('/')} className='flex items-center rounded-full p-2 bg-[#121212] '>
                    <lord-icon
                        src="https://cdn.lordicon.com/wmwqvixz.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ width: '33px', height: '33px' }}>
                    </lord-icon>
                    <p className='hidden hover:visible text-white'>Home</p>
                </div>
                <div className='relative w-1/3'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="What do you want to play?"
                        className='p-3 pl-10 rounded-full bg-[#121212] text-white w-full hover:bg-[#282828] transition duration-300'
                    />
                    <div className='absolute left-3 top-1/2 transform -translate-y-1/2 hover:color-[#ffffff]'>
                        <lord-icon
                            src="https://cdn.lordicon.com/kkvxgpti.json"
                            trigger="hover"
                            colors="primary:#b8baba"
                            style={{ width: '25px', height: '25px' }}>
                        </lord-icon>
                    </div>
                </div>
            </div>
            <div className='flex items-center '>
                <button className='text-zinc-200 px-7 py-3 font-bold rounded-full mr-4 hover:text-white hover:text-lg'>
                    SignUp
                </button>
                <button className='bg-white text-black px-7 py-3 font-bold rounded-full hover:text-black hover:text-lg'>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Navbar;