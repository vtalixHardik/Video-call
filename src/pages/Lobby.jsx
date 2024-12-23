import React, { useContext, useState } from "react";
import { RoomContext } from "../context/RoomContext";

const Lobby = () => {
  const roomID = 123; // this room ID will be the appointmentID
  const [email, setEmail] = useState("");
  const { ws, ID, setID } = useContext(RoomContext);

  // function to create a room
  const createRoom = () => {
    // create a room
    console.log("emitting to server");
    setID(email); // Store the email as the user ID

    ws.emit("create-room", { roomID });

    // redirect user to the videoCalling Page
  };
  return (
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-solid px-2 py-2 mx-auto"
      />
      {email}
      <div className="w-full flex justify-center items-center overflow-x-hidden bg-red-600">
        <button
          onClick={createRoom}
          className="px-6 py-2 bg-blue-600 text-white rounded-full"
        >
          Start new Meeting
        </button>
      </div>
    </div>
  );
};

export default Lobby;
