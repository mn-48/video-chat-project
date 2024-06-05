import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const Join: React.FC = () => {
  const ws = useContext(RoomContext);

  const joinRoom = () => {
    if (ws) {
      ws.emit("join-room");
    }
  };

  return (
    <div>
      <button
        onClick={joinRoom}
        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 border border-rose-700 rounded"
      >
        Start new meeting
      </button>
    </div>
  );
};

export default Join;
