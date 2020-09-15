const dgram = require("dgram");
const readline = require("readline");
const { OPERATIONS } = require("../operations");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = dgram.createSocket("udp4");
let port = 0;
let message = {};

socket.on("message", (msg, rinfo) => {
  console.log(`Server@${rinfo.address}:${rinfo.port}: ${msg}`);
});

console.log("Choose a port for yourself");
rl.addListener("line", (line) => {
  if (port <= 0) {
    port = parseInt(line, 10);
    socket.bind(port);
    console.log("Ok, now choose two numbers (in separate lines) and then an operation between SUM, SUB, DIV and MULT.")
  } else {
    if (!message.num1) {
      message.num1 = parseFloat(line);
    } else if (!message.num2) {
      message.num2 = parseFloat(line);
    } else if (!message.operation) {
      message.operation = OPERATIONS[line];
      socket.send(Buffer.from(JSON.stringify(message)), 4747, "127.0.0.1");
      message = {}
    } else {
      console.log("I have no idea how you got here, congratulations.");
    }
  }
});
