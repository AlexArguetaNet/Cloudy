import { Router } from "express";
import { getWeather } from "../controllers/weather";

const router = Router();

router.get("/", getWeather);

export { router as weatherRouter};