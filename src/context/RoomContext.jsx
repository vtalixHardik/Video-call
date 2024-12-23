import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";

const ip = 16;
const WS = `http://192.168.1.${ip}:8000`;

export const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
  const navigateTo = useNavigate();
  const [ws, setWs] = useState(null);
  const [ID, setID] = useState(""); // Store the user ID
  const [me, setMe] = useState(null);
  const [participants, setParticipants] = useState([]);

  const [myStream, setMyStream] = useState(null); // to store clients own media stream
  // we will use navigatore media devices which is a Browser API

  const enterRoom = ({ roomID }) => {
    if (!roomID) {
      console.error("Invalid room ID");
      return;
    }
    console.log("Navigating to room:", roomID);
    navigateTo(`/room/${roomID}`);
  };

  const getUsers = ({ participants }) => {
    console.log("Participants:", participants);
    setParticipants(participants);
  };

  useEffect(() => {
    const socket = socketIOClient(WS);
    setWs(socket);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", WS);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("room-created", enterRoom);

    socket.on("get-users", getUsers);

    // Define the async function inside useEffect
    const getMediaStream = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert(
            "Your browser does not support accessing media devices. Please use a modern browser like Chrome, Edge, or Firefox and ensure the app is served over HTTPS."
          );
          console.error("MediaDevices API is not available.");
          return;
        }

        // Request media stream with video and audio
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMyStream(stream); // Set the stream to state
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getMediaStream();

    return () => {
      socket.disconnect();
      console.log("WebSocket connection closed");
    };
  }, []);

  // useEffect(() => {
  //   const peer = new Peer(ID);
  //   setMe(peer);
  // }, [ID]);

  // now we need to make other users see ouur stream
  useEffect(() => {
    if(!ID) return;
    if(!myStream) return;
  }, [ID, myStream]);

  return (
    <RoomContext.Provider value={{ ws, ID, setID, participants, me, myStream }}>
      {children}
    </RoomContext.Provider>
  );
};
