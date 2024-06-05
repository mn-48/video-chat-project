import React, { createContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";

const WS = "http://localhost:8080";

// Define the type for the context value
type RoomContextType = Socket | null;

export const RoomContext = createContext<RoomContextType>(null);

const ws = socketIOClient(WS);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FunctionComponent<RoomProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const enterRoom = ({ roomId }: { roomId: "string" }) => {
    console.log(roomId);
    navigate(`/room/${roomId}`);
  };
  useEffect(() => {
    ws.on("room-created", enterRoom);
  }, []);

  return <RoomContext.Provider value={ws}>{children}</RoomContext.Provider>;
};
