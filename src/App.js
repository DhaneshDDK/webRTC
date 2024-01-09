import React from "react";
import { Routes, Route } from "react-router-dom";
import LobbyScreen from "./Screens/Lobby";
import Room from "./Screens/Room";

function App() {
  return (
    <div className="">
       <Routes>
         <Route path="/" element={<LobbyScreen/>} />
         <Route path="/room/:roomId" element={<Room/>}/>
       </Routes>
    </div>
  );
}

export default App;
