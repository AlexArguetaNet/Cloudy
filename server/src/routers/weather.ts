import { Router } from "express";
import { getWeather } from "../controllers/weather";

// Create router instance
const router = Router();

// Set up routes
router.post("/", getWeather);

export { router as weatherRouter};