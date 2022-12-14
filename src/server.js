import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
dotenv.config()

const server = express();

server.use(cors(), express.json());

server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running successfully at PORT ${PORT}.`))