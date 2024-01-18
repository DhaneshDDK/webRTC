import React from "react";
import { Routes, Route } from "react-router-dom";
import LobbyScreen from "./Screens/Lobby";
import Room from "./Screens/Room";
import Home from "./Screens/Home";
import { lazy } from "react";
import { Suspense } from "react";
const Videoplayer = lazy(()=>import('./Screens/Videoplayer'))

function App() {
  return (
    <div className="">
       <Routes>
       <Route path="/" element={<Home/>} />
         <Route path="/videoplayer" element={
          <Suspense fallback={
            <div className="w-[100vw] h-[100vh] font-bold flex items-center justify-center text-[25px]">Video is loading....</div>
          }>
             <Videoplayer/> 
          </Suspense>
         } />
         <Route path="/videocall" element={<LobbyScreen/>} />
         <Route path="/room/:roomId" element={<Room/>}/>
       </Routes>
    </div>
  );
}

export default App;
