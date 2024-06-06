import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const Create: React.FC = () => {
  const {ws, me} = useContext(RoomContext);

  const createRoom = () => {
    console.log("createRoom clicked");
    if (ws) {
      ws.emit("create-room");
    }
  };

  return (
    <div>
      <button
        onClick={createRoom}
        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 border border-rose-700 rounded"
      >
        Start new meeting
        
      </button>
    </div>
  );
};

export default Create;
