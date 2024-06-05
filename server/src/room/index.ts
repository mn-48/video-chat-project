import { Socket } from "socket.io";
import { v4 as uuid4 } from "uuid";

export const roomHandeler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuid4();
    socket.join(roomId);
    socket.emit("room-created", { roomId });

    console.log("user created the room");
  };

  const joinRoom = () => {
    console.log("user is joined the room.");
  };

  socket.on("create-room", createRoom);

  socket.on("join-room", joinRoom);
};
