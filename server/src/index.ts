import express from "express";
import http from "http";

const port = 8000;

const app = express;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening to the server | ${port}`);
});
