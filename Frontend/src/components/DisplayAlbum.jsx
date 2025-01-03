import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
// import { albumData, songData } from '../assets/assests.js';
import { PlayerContext } from '../context/PlayerContext.jsx';
import { useState } from 'react';
import { useEffect } from 'react';



function DisplayAlbum({album}) {
    const { id } = useParams();
    const [albumData,setAlbumData] = useState("");
    const {playWithId, albumsData, SongData} = useContext(PlayerContext);

    useEffect(()=>{
        albumsData.map((item)=>{
            if(item._id === id){
                setAlbumData(item);
            }
        })
    })

    return albumData ? (
        <>
            <div className='mt-14 flex gap-8 flex-col md:flex-row md:items-end'>
                <img src={album.image} alt={album.name} className='w-60 h-60 rounded' />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:7xl'>{album.name}</h2>
                    <h4>{album.desc}</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5 ' src='https://www.citypng.com/public/uploads/preview/spotify-white-logo-symbol-icon-hd-png-11661570403q5drcznuwu.png' alt="" />
                        <b>Spotify</b>
                        * 1.2M likes
                        * <b>50 songs,</b>
                        * 3 hr 32 min
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <lord-icon
                    src="https://cdn.lordicon.com/kgdqzapd.json"
                    trigger="hover"
                    colors="primary:#a7a7a7"
                    style={{ width: '30px', height: '30px' }}>
                </lord-icon>
            </div>
            <hr />
            {
                songData.filter((item)=>item.album === album.name).map((item,index) => (
                    <div onClick={()=>playWithId(item.id)} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer'>
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                            <img className='inline w-10 mr-5' src={item.image} alt="" />
                            {item.name}
                        </p>
                        <p className='text-[15px]'>{album.name}</p>
                        <p className='text-[15px] hidden sm:block'>5 Days ago</p>
                        <p className='text-[15px] text-center'>{item.duration}</p>
                    </div>
                ))
            }
        </>
    ) : null
}

export default DisplayAlbum;