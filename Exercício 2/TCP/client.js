const net = require("net");
const readline = require("readline");
const { OPERATIONS } = require("../operations");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();
let message = {};

const connectClient = () => {
  client.connect(7474, "127.0.0.1", () => {
    console.log("Connected to server!\n");
    console.log(
      "Ok, now choose two numbers (in separate lines) and then an operation between SUM, SUB, DIV and MULT."
    );
    rl.addListener("line", (line) => {
      if (!message.num1) {
        message.num1 = parseFloat(line);
      } else if (!message.num2) {
        message.num2 = parseFloat(line);
      } else if (!message.operation) {
        message.operation = OPERATIONS[line];
        client.write(Buffer.from(JSON.stringify(message)));
        message = {};
      } else {
        console.log("I have no idea how you got here, congratulations.");
      }
    });
  });
};

client.on("data", (data) => {
  console.log(`Server: ${data.toString()}`);
});

client.on("error", async () => {
  console.log("Lost connection, trying to reconnect...");
  setTimeout(connectClient, 3000);
});

connectClient();
