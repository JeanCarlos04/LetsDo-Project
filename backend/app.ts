import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./src/routes/routes.ts";
import cookieParser from "cookie-parser";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
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

app.listen(PORT, () => {
  console.log("Listening in port: " + PORT);
});
