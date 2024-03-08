import { Request, Response } from "express";
import axios from "axios";

// GET: Get current and 5-day forecast
export const getWeather = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const apiKey = process.env.API_KEY;
    const city = "Charlotte";

    try {

        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`);
        return res.json(weather.data);

    } catch(err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        return res.json(err);
    }

}