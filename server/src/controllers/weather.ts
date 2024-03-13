import { Request, Response } from "express";
import axios from "axios";

// POST: Get current and 5-day forecast based on user's searched city name
export const getWeather = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const apiKey = process.env.API_KEY;
    const { city, units, cords } = req.body;

    if (city === "" && cords == undefined) return res.json({ error: "Empty input", msg: "Please enter a city name" });

    try {

        // Set lat and lon variables
        let lat;
        let lon;
        let geoLocation;

        if (cords) {
            lat = cords.lat;
            lon = cords.lon;
            geoLocation = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
        } else {
            // Get geolocation
            geoLocation = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
            lat = geoLocation.data[0].lat;
            lon = geoLocation.data[0].lon;
        }

        // Create location object
        const location = { 
            name: geoLocation.data[0].name, 
            country: geoLocation.data[0].country, 
            state: geoLocation.data[0].state || "" // Incase no state attribute is returned from API call
        }

        console.log(location);

        // Get current forecast
        const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.data[0].lat}&lon=${geoLocation.data[0].lon}&units=${units}&appid=${apiKey}`);

        // Response contains daily forecast
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoLocation.data[0].lat}&lon=${geoLocation.data[0].lon}&units=${units}&cnt=5&appid=${apiKey}`);
        // Extract then splice daily forecast array to get forecast for next 5 days instead of 8
        const fiveDay: object[] = weatherData.data.daily;
        fiveDay.pop();
        fiveDay.pop();
        fiveDay.pop();

        // Set correct units
        let unitSymbols = {};

        let imperialSymbols = {
            temp: "F",
            speed: "mph",
            distance: "mi"
        }

        let metricSymbols = {
            temp: "C",
            speed: "kph",
            distance: "km"
        }
        units === "imperial" ? unitSymbols = imperialSymbols : unitSymbols = metricSymbols;

        current.data.unitSymbols = unitSymbols;


        return res.json({ location, current: current.data, fiveDay });

    } catch(err) {
        if (err instanceof Error) {
            console.log(err);
        }
        return res.json({ error: err, msg: "No results"});
    }

}