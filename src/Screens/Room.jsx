import React from 'react'
import { useSocket } from '../Context/SocketProvider'
import { useEffect, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import peer from '../service/peer';

const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [media, setMedia] = useState(null);
    const [remoteMedia, setRemoteMedia] = useState(null);
    const [hide, setHide] = useState(false);

    const handleUserJoined = (data)=>{
       console.log(`Email ${data.email} has joined the room`);
       setRemoteSocketId(data.id);
    }

    const handleIncomingCall = useCallback(async ({from, offer})=>{ 
         setRemoteSocketId(from);
         const ans = await peer.getAnswer(offer);
         const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        }); 
        setMedia(stream);
        socket.emit('call:accepted',{to:from, ans});
    },[socket])

    const sendStreams = useCallback(()=>{
      for(const track of media.getTracks()){
        // console.log(track,media);
        peer.peer.addTrack(track,media);
      }
    },[media])
    
    const handleCallAccepted = useCallback(async({from,ans})=>{
       await peer.setAnswerDescription(ans);
       console.log("call accepted");
       sendStreams();
    },[sendStreams]);

   const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setAnswerDescription(ans);
  }, []);

  const handleStreamBtn = useCallback(
    ()=>{
       setHide(true)
    }
  ,[])


    useEffect(()=>{
       peer.peer.addEventListener('track', async (ev)=>{
        const remoteStream = ev.streams;
        console.log("GOT TRACKS!!");
        setRemoteMedia(remoteStream[0]);
       })
    },[])

    useEffect(() => {
      peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
      return () => {
        peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
      };
    }, [handleNegoNeeded]);

    useEffect(()=>{
        socket.on('user-joined', handleUserJoined);
        socket.on('incoming-call',handleIncomingCall);
        socket.on('call:accepted',handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
        socket.on('hide-streambtnOn', handleStreamBtn)
        return ()=>{
         socket.off('user-joined', handleUserJoined);
         socket.off('incoming-call',handleIncomingCall);
         socket.off('call:accepted',handleCallAccepted);
         socket.off("peer:nego:needed", handleNegoNeedIncomming);
         socket.off("peer:nego:final", handleNegoNeedFinal);
         socket.on('hide-streambtnOn', handleStreamBtn)
        }
    },[socket, handleUserJoined, handleIncomingCall, handleCallAccepted])

    const handleCall = useCallback(async ()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });  
      setMedia(stream);
      const offer = await peer.getOffer();
      socket.emit('user:call', {to : remoteSocketId, offer: offer})
    },[socket,remoteSocketId])

  return (
    <div className=' text-center text-[22px] font-bold my-10 flex items-center justify-center flex-col gap-6'>
         <h1 >Room</h1>
         {
            remoteSocketId ? <div>
                <div>Connected</div> <br />
              <button 
              onClick={handleCall}
              className={`border-2 px-4 py-2 inline-block ${hide? "hidden":"visible"} rounded-md bg-slate-700 text-white`}>Call</button>
            </div> :  <div>No one in the room</div>
         }

         {media && <button 
          className={` border-2 px-4 py-2 ${hide? "hidden":"visible"} inline-block rounded-md bg-slate-700 text-white`}
         onClick={()=>{
          sendStreams(); 
          socket.emit('hide-streambtn',{});
         }}>Send Stream</button>}

        <div className="flex flex-wrap gap-10 max-w-full items-center justify-center">

         {
            media && 
            <div className='flex flex-col gap-3'>
            <h1>My Stream</h1>
            <ReactPlayer playing muted controls url={media} height="300px" width="500px"  />
            </div>
         }
         {
            remoteMedia && 
            <div className='flex flex-col gap-3'>
            <h1>Remote Stream</h1>
            <ReactPlayer playing muted controls url={remoteMedia} height="300px" width="500px"  />
            </div>
         }
         </div>
    </div>
  )
}

export default Room
