import { Request, Response } from "express";
import axios from "axios";

// POST: Get current and 5-day forecast based on user's searched city name
export const getWeather = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const apiKey = process.env.API_KEY;
    const { city } = req.body;

    if (city === "") return res.json({ error: "Empty input", msg: "Please enter a city name" });

    try {

        const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&&appid=${apiKey}`);
        const fiveDay = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&cnt=5&appid=${apiKey}`);
        const weather = {current: current.data, fiveDay: fiveDay.data};

        return res.json(weather);

    } catch(err) {
        if (err instanceof Error) {
            console.log(err);
        }
        return res.json({ error: err, msg: "No results"});
    }

}