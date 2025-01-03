import React from 'react';
// import { albumData } from '../assets/assests.js';
import AlbumItem from './AlbumItem';
// import { songData } from '../assets/assests.js';
import SongItem from './SongItem.jsx';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext.jsx';

const DisplayHome = () => {

  const {songData, albumsData} = useContext(PlayerContext);

  return (
    <>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>today's biggest hit's</h1>
        <div className='flex overflow-auto'>
          {songData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;