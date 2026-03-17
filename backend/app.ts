import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./src/routes/routes.ts";
import cookieParser from "cookie-parser";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { Server } from "socket.io";
import ChatSchema from "./src/models/ChatSchema.ts";
import MessageSchema from "./src/models/MessageSchema.ts";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

declare module "socket.io" {
  interface Socket {
    user: { id: string; iat: number; exp: number };
  }
}

export interface SocketUser extends Socket {}

export interface Payload {
  id: string;
  iat: number;
  exp: number;
}

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});
app.use(routes);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(join(__dirname, "./uploads")));
const PORT = 3000;

const connectDB = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/LetsDo_database");
    console.log("🟢 CONECTION SUCCESFULLY");
  } catch (err) {
    console.log("🔴 SOMETHING WENT WRONG " + err);
  }
};

connectDB();

io.use((socket: SocketUser, next) => {
  const token = socket.handshake.auth.token;
  try {
    if (!token) return next(new Error("Not token provided"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
    socket.user = decoded;
    next();
  } catch (err) {
    return console.error(err);
  }
});

io.on("connection", (socket) => {
  console.log("🟢 User connected");

  socket.on("send message", async (msgData) => {
    const message = await MessageSchema.create({
      user: socket.user.id,
      text: msgData.text,
      chat: msgData.chat,
    });

    const foundedChat = await ChatSchema.findById(msgData.chat);
    foundedChat?.messages.push(message._id);
    foundedChat?.save();

    socket.emit("individual message", { ...msgData, user: socket.user.id });
  });

  socket.on("getAllMessages", async (chatId) => {
    const allMessages = await ChatSchema.findById(chatId)
      .select("messages")
      .populate("messages");

    socket.emit("recieve message", allMessages?.messages);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Listening in port: " + PORT);
});
