import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

  const [data,setData] = useState([]);

  const fetchAlbums = async ()=> {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      if ( res.data.success){
        setData(res.data.albums)
      }
    } catch (error) {
      toast.error("error occur")
    }
  }

  const removeAlbum = async (id) => {
    try {
      const res = await axios.post(`${url}/api/album/remove`,{id});
      if(res.data.success){
        toast.success(res.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error Occured")
    }
  }

  useEffect(() => {
    fetchAlbums();
  })

  return (
    <div>
        <p>All Albums list</p>
        <br />
        <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Desciption</b>
            <b>Album Color</b>
            <b>Action</b>
          </div>
          {data.map((item,index)=>{
            return(
              <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img className='w-12' src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.desc}</p>
                <input type="color" value={item.bgColor} />
                <p onClick={()=>removeAlbum(item._id)} className='cursor-pointer'>x</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default ListAlbum