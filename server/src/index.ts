import express from "express";
import cors from "cors";
import "dotenv/config";
import { weatherRouter } from "./routers/weather";

// Create express instance
const app = express();
const PORT = process.env.PORT;

// Mount middleware functions and routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", weatherRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})