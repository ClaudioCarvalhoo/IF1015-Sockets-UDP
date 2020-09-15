const dgram = require("dgram");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = dgram.createSocket("udp4");

socket.on("message", (msg, rinfo) => {
  console.log(`Server@${rinfo.address}:${rinfo.port}: ${msg}`);
});

rl.addListener("line", (line) => {
  socket.send(line, 4747, "127.0.0.1");
});

socket.bind(7447);
