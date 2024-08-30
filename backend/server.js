import path from "path";

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse the incoming request with JSON payloads || ise ki wajah se req.body se hum username fullName password wagera ko access kar sakte hain
app.use(cookieParser()); //Isko use kiya gaya hai ki jab koi ek send kisi reciever ko message bhejega to usko check karna padega ki wo authentic hai ki nhi wo cookie se check hoga aur usko middleware me use karne k liye ye use hua hai cookieParser
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// app.length("/", (req, res) => {
//     //root route "http://localhost:5000/"
//   res.send("Welcome to the server");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
