import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ws, me, stream } = useContext(RoomContext);

  useEffect(() => {
    if (me && ws && id) {
      ws.emit("join-room", { roomId: id, peerId: me.id });
    }
  }, [id, me, ws]);

  return (
    <>
      Room id: {id}
      <div>
        <VideoPlayer stream={stream} />
      </div>
    </>
  );
};

export default Room;
