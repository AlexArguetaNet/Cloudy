import { Router } from "express";
import { getWeather } from "../controllers/weather";

const router = Router();

router.post("/", getWeather);

export { router as weatherRouter};