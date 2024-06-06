import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {ws, me }= useContext(RoomContext);

  useEffect(() => {
    if (me && ws && id) {
      ws.emit("join-room", { roomId: id, peerId: me.id });
    }
  }, [id, me, ws]);

  return (
    <div>
      Room id: {id}
    </div>
  );
};

export default Room;
