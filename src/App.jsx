import { useContext, useState } from "react";
import { RoomContext } from "./context/RoomContext";
import {Routes, Route} from "react-router-dom"
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/room/:roomID" element={<Room />} />
    </Routes>
    
    </>
  );
}

export default App;
