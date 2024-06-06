import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../context/peerReducer";

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ws, me, stream, peers } = useContext(RoomContext);

  useEffect(() => {
    if (me && ws && id) {
      ws.emit("join-room", { roomId: id, peerId: me.id });
    }
  }, [id, me, ws]);

  return (
    <>
      Room id: {id}
      <div className="grid grid-cols-4 gap-4">
        <VideoPlayer stream={stream} />
        {Object.values(peers as PeerState).map(peer => (<VideoPlayer stream={peer.stream}/>))}
      </div>
    </>
  );
};

export default Room;
