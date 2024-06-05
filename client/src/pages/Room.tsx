import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';

const Room: React.FC = () => {
  const ws = useContext(RoomContext);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (ws && id) {
      ws.emit("join-room", { roomId: id });
    }
  }, [ws, id]);

  return (
    <div>
      Room id: {id}
    </div>
  );
};

export default Room;
