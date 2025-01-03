import React, { useEffect } from 'react';
import 'lord-icon-element';

const Sidebaar = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.lordicon.com/xdjxvujz.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className='w-[20%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
            <div className='bg-[#121212] h-[90%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center mt-14 text-zinc-300 gap-3 hover:text-white'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ijahpotn.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ width: '35px', height: '45px' }}>
                        </lord-icon>
                        <p className='font-semibold text-zinc-300 hover:text-white'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3 mt-14 hover:text-white'>
                        <p className='w-5 text-2xl'>+</p>
                    </div>
                </div>
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col justify-start items-start gap-1 pl-4'>
                    <h1>Create your first playlist</h1>
                    <p className='font-light'>It's easy, we'll help you</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] font-bold text-black rounded-full mt-4'>Create playlist</button>
                </div>
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col justify-start mt-5 items-start gap-1 pl-4'>
                    <h1>Let's find some podcast to follow</h1>
                    <p className='font-light'>We'll keep you updated on new episodes</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] font-bold text-black rounded-full mt-4'>Browse podcasts</button>
                </div>
                <span className='p-4 mt-5 flex flex-wrap gap-6 pl-4 '>
                    <a href="#">Legal</a>
                    <a href="#">Safety&PrivacyCenter</a>
                    <a href="#">PrivacyPolicy</a>
                    <a href="#">Cookies</a>
                    <a href="#">About Ads</a>
                    <a href="#">Accessibility</a>
                    <a href="#">Cookies</a>
                </span>
            </div>
        </div>
    );
};

export default Sidebaar;