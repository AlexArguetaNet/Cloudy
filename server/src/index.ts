import express from "express";
import cors from "cors";
import "dotenv/config";
import { weatherRouter } from "./routers/weather";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", weatherRouter);

app.listen(PORT, () => {
    console.log(`Connected to mongodb! Server running on PORT ${PORT}`);
})