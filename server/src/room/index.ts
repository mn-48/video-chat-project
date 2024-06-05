import { Socket } from "socket.io";

export const roomHandeler = (socket: Socket) => {

  const joinRoom = () => {
    console.log("user is joined the room.");
  }
  
  const createRoom = () => {
    console.log("user created the room");
  }
  
  socket.on("create-room", createRoom);

  socket.on("join-room", joinRoom);
};
