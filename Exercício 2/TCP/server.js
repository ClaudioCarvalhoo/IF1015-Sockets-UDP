const net = require("net");
const { OPERATIONS } = require("../operations");

const handleConnection = (socket) => {
  socket.on("data", (data) => {
    payload = JSON.parse(data);
    let { num1, num2, operation } = payload;
    switch (operation) {
      case OPERATIONS.SUM:
        socket.write(`${num1 + num2}`);
        break;
      case OPERATIONS.SUB:
        socket.write(`${num1 - num2}`);
        break;
      case OPERATIONS.DIV:
        socket.write(`${num1 / num2}`);
        break;
      case OPERATIONS.MULT:
        socket.write(`${num1 * num2}`);
        break;
      default:
        socket.write("Invalid operation");
    }
  });
};

const server = net.createServer(handleConnection);
server.listen(7474, "127.0.0.1");