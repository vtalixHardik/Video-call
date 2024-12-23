import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import VideoPlayer from "../components/VideoPlayer";
import ReactPlayer from "react-player";

const Room = () => {
  const { roomID } = useParams();
  const { ws, ID, myStream, peers } = useContext(RoomContext);

  useEffect(() => {
    if (ws) {
      ws.emit("join-room", { roomID, ID });
    }
  }, [ws, roomID, ID]);

  useEffect(() => {
    // Check if the stream is being received correctly
    console.log("Received stream:", myStream);
  }, [myStream]);

  return (
    <>
      <div className="h-dvh w-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl">Room {roomID}</h1>
        {/* <div className="h-full w-full">
        Ensure myStream is available before passing it
        {myStream ? (
          <VideoPlayer />
        ) : (
          <p>Loading stream...</p>
        )}
      </div> */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1>My stream</h1>
            <ReactPlayer
              url={myStream}
              playing
              muted
              height="320px"
              width="320px"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
          <h1>others stream</h1>
          <div className="flex flex-col justify-center items-center gap-3">
            {Object.values(peers).map((peer, index) => (
              <ReactPlayer
                key={index}
                url={peer.peerStream}
                playing
                muted
                height="320px"
                width="320px"
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Room;
