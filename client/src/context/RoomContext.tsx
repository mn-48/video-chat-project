import Peer from "peerjs";
import React, { createContext, ReactNode, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from "./peerReducer";
import { addPeerAction } from "./peersActions";

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
  const [peers, dispatch] = useReducer(peersReducer, {})



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


  useEffect(() => {

    if (!me) return;
    if (!stream) return;

    ws.on("user-joined", (peerId) => {

      const call = me.call(peerId, stream);

      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream))
      })

    });

    me.on("call", (call)=>{

      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream))
      })

    })

    
  }, [me, stream])


  console.log("Peers: ",peers);




  return (
    <RoomContext.Provider value={{ ws, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
