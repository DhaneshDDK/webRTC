import React, { useEffect } from 'react'
import { AdvancedVideo } from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {scale} from "@cloudinary/url-gen/actions/resize";
import { useState } from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';

const Videoplayer = () => {

    const [url, setURL] = useState(null);
    const [quality, setQuality] = useState(144);
    const timeStamp = useRef(0);

    useEffect(()=>{
        const cld = new Cloudinary({
            cloud: {
              cloudName: 'demo'
            }
          });

// Instantiate a CloudinaryVideo object for the video with public ID, 'elephants'.
      const myVideo = cld.video('elephants');
      // Scale the video to a width of 400 pixels.
      myVideo.resize(scale().width(quality));

// Get the URL of the video.
         const myURL = myVideo.toURL();

       setURL(myURL);
       
    },[quality])
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col gap-5 items-center justify-center px-2'>
       <div className='max-w-[1200px]'>
       <ReactPlayer
        url={url}
        ref={timeStamp}
       controls muted width='100%'
       ></ReactPlayer>
       </div>
       <div className='flex gap-4 items-center justify-center flex-wrap'>
        <h2 className='text-[20px] font-bold'>Select video quality:</h2>
       <select className=' border-2  rounded-md bg-slate-500 px-1 py-2 font-mono'
        onChange={(e)=>{
                setQuality(e.target.value);
        }}
       > 
        <option value='144'>144</option>
        <option value='400'>400</option>
        <option value='720'>720</option>
        <option value='1080'>1080</option>
        <option value='2040'>2040</option>
       </select>
       </div>

    </div>
  )
}

export default Videoplayer
