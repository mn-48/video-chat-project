import { Socket } from "socket.io";
import { v4 as uuid4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: "string";
  peerId: "string";
}

export const roomHandeler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuid4();
    socket.join(roomId);

    rooms[roomId] = [];

    socket.emit("room-created", { roomId });

    console.log("user created the room");
  };

  const joinRoom = ({ roomId, peerId }: IRoomParams) => {
    console.log("user is joined the room.", roomId, peerId);
    rooms[roomId].push(peerId);
    socket.join(roomId);
    socket.emit("get-users", { roomId, participants: rooms[roomId] });
  };

  const leaveRoom = ({ roomId, peerId }: IRoomParams) => {
    rooms[roomId]= rooms[roomId].filter((id)=>id !== peerId)
    socket.to(roomId).emit("user-disconnected", peerId)
  };

  socket.on("create-room", createRoom);

  socket.on("join-room", joinRoom);
};
