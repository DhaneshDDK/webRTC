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
        <h1 className=' text-center text-[2.5em] font-bold my-10 font-serif text-white'>Lobby Screen</h1>
        <form onSubmit={handleSubmit}>
            {/* <label htmlFor="email">Email</label> */}
            <input type="email" name="email" id="email" required className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 font-semibold dark:focus:border-blue-500 font-serif' placeholder='email' value={email}  
                onChange={(e)=>{setEmail(e.target.value);}}
            />
             <br/> <br/>
            {/* <label htmlFor="room">Room Id</label> */}
            <input type="text" name='room' id="room" required className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 font-semibold dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='room Id' value={room}
            onChange={(e)=>{setRoom(e.target.value);}}
              />
           <br/> <br/>
           <button type="submit" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Join</button>
        </form>
    </div>
  )
}

export default LobbyScreen
