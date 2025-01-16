import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.join(__dirname, "..", "..", "..", ".env"), // Going up two levels from backend
});
const app = express();
const PORT = process.env.CHAT_SOCKET_PORT || 5502;
const httpServer = createServer(app);
const CHAT_SERVICE_BASE_URL = process.env.CHAT_SERVICE_BASE_URL;
// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.get("/", (req, res) => {
    res.send("Socket.io server is running!");
});
// Handle socket connections
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("chat", async (data) => {
        console.log(`User Question received: ${data.user_question}`);
        // const response = await axios.post(`${CHAT_SERVICE_BASE_URL}/chat`, {
        //   envelope_id: data.envelopeId,
        //   user_question: data.user_question,
        // });
        const dummyResponse = { data: data };
        io.emit("ai_response", dummyResponse.data);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
httpServer.listen(PORT, () => {
    console.log(`Chat socket server is running on http://localhost:${PORT}`);
});
