import React from 'react'
import { useState , useCallback} from 'react'
import { useSocket } from '../Context/SocketProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LobbyScreen = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
       socket.emit('room-join', {email, room});
    },[email,room, socket])
    
   const handleRoomJoin = useCallback((data)=>{
      const {email, room} = data;
      console.log(email, room);
      navigate(`/room/${room}`);
   })

   useEffect(()=>{
    socket.on('room-join', handleRoomJoin);
    return ()=>{
        socket.off('room-join', handleRoomJoin);
    }
   },[socket, handleRoomJoin]);

  return (
    <div className='flex flex-col gap-10 items-center justify-center' >
        <h1 className=' text-center text-[22px] font-bold my-10'>Lobby Screen</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className='outline-none border-2 mx-2' value={email}  
                onChange={(e)=>{setEmail(e.target.value);}}
            />
             <br/> <br/>
            <label htmlFor="room">Room Id</label>
            <input type="text" name='room' id="room" className='outline-none border-2 mx-2' value={room}
            onChange={(e)=>{setRoom(e.target.value);}}
              />
           <br/> <br/>
              <button type="submit" className='border-2 px-4 py-2 rounded-md bg-slate-700 text-white'>Join</button>
        </form>
    </div>
  )
}

export default LobbyScreen
