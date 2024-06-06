import Peer from "peerjs";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";
import { v4 as uuidV4 } from "uuid";

const WS = "http://localhost:8080";

// Define the type for the context value

export const RoomContext = createContext<null | any>(null);


const ws = socketIOClient(WS);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FunctionComponent<RoomProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer | null>(null);
  const [stream, setStream] = useState< MediaStream | null>()

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId);
    navigate(`/room/${roomId}`);
  };
  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log(participants);
    
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);


    try{
      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) =>  {
        setStream(stream);
      })


    }catch(error){
        console.error(error);

    }

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      ws.off("room-created", enterRoom);
    };
  }, []);

  return (
    <RoomContext.Provider value={{ ws, me, stream }}>
      {children}
    </RoomContext.Provider>
  );
};
