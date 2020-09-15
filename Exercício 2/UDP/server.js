const dgram = require("dgram");
const { OPERATIONS } = require("../operations");

const socket = dgram.createSocket("udp4");

socket.on("message", (data, rinfo) => {
  payload = JSON.parse(data);
  let { num1, num2, operation } = payload;
  switch (operation) {
    case OPERATIONS.SUM:
      socket.send(`${num1 + num2}`, rinfo.port, rinfo.address);
      break;
    case OPERATIONS.SUB:
      socket.send(`${num1 - num2}`, rinfo.port, rinfo.address);
      break;
    case OPERATIONS.DIV:
      socket.send(`${num1 / num2}`, rinfo.port, rinfo.address);
      break;
    case OPERATIONS.MULT:
      socket.send(`${num1 * num2}`, rinfo.port, rinfo.address);
      break;
    default:
      socket.send("Invalid operation", rinfo.port, rinfo.address);
  }
});

socket.bind(4747);
