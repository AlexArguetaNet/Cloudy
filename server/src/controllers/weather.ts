import { Request, Response } from "express";
import axios from "axios";

// POST: Get current and 5-day forecast based on user's searched city name
export const getWeather = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const apiKey = process.env.API_KEY;
    const { city, units, cords } = req.body;

    // Handle empty input
    if (city === "" && cords == undefined) return res.json({ error: "Empty input", msg: "Please enter a city name" });

    try {

        // Set lat and lon variables
        let lat;
        let lon;
        let geoLocation;

        console.log(cords);

        // Get location based on given coordinates or the name of a city
        if (cords) {
            lat = cords.lat;
            lon = cords.lon;
            geoLocation = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
        } else {
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

        // Get current forecast
        const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.data[0].lat}&lon=${geoLocation.data[0].lon}&units=${units}&appid=${apiKey}`);

        /* 
            Extract 8 day forecast from this response.
            Then pop the last 3 elements from the array
            to get the forecast for the nex t5 days
        */
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoLocation.data[0].lat}&lon=${geoLocation.data[0].lon}&units=${units}&cnt=5&appid=${apiKey}`);
        const fiveDay: object[] = weatherData.data.daily;
        fiveDay.pop();
        fiveDay.pop();
        fiveDay.pop();

        // Set units of measurement according to user's input
        let unitSymbols = {};
        const imperialSymbols = {
            temp: "F",
            speed: "mph",
            distance: "mi"
        }
        const metricSymbols = {
            temp: "C",
            speed: "kph",
            distance: "km"
        }
        units === "imperial" ? unitSymbols = imperialSymbols : unitSymbols = metricSymbols;
        current.data.unitSymbols = unitSymbols;


        return res.json({ location, current: current.data, fiveDay });

    } catch(err) {
        if (err instanceof Error) {
            console.log(`Error: Could not fetch data`);
        }
        return res.json({ error: err, msg: "No results"});
    }

}