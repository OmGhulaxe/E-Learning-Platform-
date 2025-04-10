const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");


const server = http.createServer(app);

// connectDB();


// Add Socket.io for real-time features
// const { Server } = require("socket.io");
// const io = new Server(server);
// require("./utils/socket")(io); // Real-time logic

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
