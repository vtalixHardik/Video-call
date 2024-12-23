import { useContext, useEffect, useRef } from 'react';
import { RoomContext } from "../context/RoomContext";

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const { myStream } = useContext(RoomContext);

    useEffect(() => {
        // Check if videoRef and myStream are valid
        if(!myStream){
            console.log("No stream");
        }
        if (videoRef.current && myStream) {
            console.log('Setting video stream');
            videoRef.current.srcObject = myStream;
        }
    }, [myStream]);

    return (
        <div className='h-full w-full'>
            <video ref={videoRef} autoPlay muted={true} className='h-56 w-56' />
        </div>
    );
}

export default VideoPlayer;
