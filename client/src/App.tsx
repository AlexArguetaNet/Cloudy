import './styles/App.css'
import { Navbar } from './components/Navbar'
import { CurrentWeather } from './components/CurrentWeather';
import { FiveDay } from './components/FiveDay';
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from 'react';
import { LoadingModal } from './components/LoadingModal';
import { useGeolocation } from '@uidotdev/usehooks';

function App() {

  // TODO: Continue finding day/night images for weather conditions

  const [currWeather, setCurrWeather] = useState({});
  const [location, setLocation] = useState({});
  const [fiveDay, setFiveDay] = useState({});
  const [loading, setLoading] = useState(false);
  const [unitSymbol, setUnitSymbol] = useState("");
  const [currLocation, setCurrLocation] = useState(false);
  const [cords, setCords] = useState({});

  // Apply background image to the body
  const [imgUrl, setImgUrl] = useState("");
  window.document.body.style.backgroundImage = `url(${imgUrl})`;


  // Fetch weather data
  function getWeather(city: string, units: string, cords?: object): void {

    setLoading(true);

    // Set timeout
    axios.defaults.timeout = 15000;

    // API call to the server
    axios.post("http://localhost:4001/", { city: city.split(' ').join('+'), units, cords })
    .then((res: AxiosResponse) => {

      if (res.data.error) {
        alert(res.data.msg);
      } else {

        // Check current weather condition to determine background image
        let weatherCondition = res.data.current.weather[0].main
        let cond: string;
        if (weatherCondition == "Clear") {
          cond = "clear";
        } else if (weatherCondition == "Clouds") {
          cond = "clouds";
        }  else if (weatherCondition == "Rain") {
          cond = "rain";
        } else if (weatherCondition == "Snow") {
          cond = "snow";
        } else if (weatherCondition == "Mist" || 
                    weatherCondition == "Fog" || 
                    weatherCondition == "Smoke") {
          cond = "mist";
        } else {
          cond = "none";
        }

        // Get current time in target location
        let dt = res.data.current.dt;
        let timezone = res.data.current.timezone;
        const utcSeconds = parseInt(dt) + parseInt(timezone);
        const utcMilliseconds = utcSeconds * 1000;
        const localDate = new Date(utcMilliseconds);
      
        // Check if it is day or night in target location
        let picTime: string;
        if (localDate.getUTCHours() >= 7 && localDate.getUTCHours() <= 18) {
          picTime = "day";
        } else {
          picTime = "night";
        }

        // Set background image URL
        setImgUrl(`/src/assets/backgrounds/${cond}_${picTime}.jpg`); 

        // Get current and fiveDay weather data from response
        setCurrWeather(res.data.current);
        setLocation(res.data.location);
        setFiveDay(res.data.fiveDay);
        setUnitSymbol(res.data.current.unitSymbols.temp);

        // Store city name and units in browser's local storage
        window.localStorage.setItem("city", res.data.location.name);
        window.localStorage.setItem("units", units);

      }

      setLoading(false);
    })
    .catch(err => {
      alert(err.message);
      setLoading(false);
    });
  }


  // Ask for permission to use current location
  const permission = useGeolocation();
  if (permission.loading == false && currLocation == false) {

    // Check if the user allowed permission to user their location
    if (permission.error == null) {
      setCurrLocation(true);
      setCords({ lat: permission.latitude, lon: permission.longitude });
    }

  }

  // Fetch forecast based on the user's current location
  function getCurrLocationForecast(): void {
    getWeather("", window.localStorage.getItem("units") || "imperial", cords);
  }
  

  // Fetch weather data on initial render
  useEffect(() => {
    
      // Check for units in local storage
      let units = window.localStorage.getItem("units");
      if (!units) units = "imperial";

      // Check for city in local storage
      let localCity = window.localStorage.getItem("city");
      localCity ? getWeather(localCity || "", units || "") : getWeather("cupertino", units || "");
    
  }, []);





  return (
      <div className="app">

        {/* Loading modal */}
        { loading && <LoadingModal/>}
        
        <Navbar  getWeather={getWeather} getCurrLocationForecast={getCurrLocationForecast}/>
        <div className="weather-container">
          {/* Only render UI when weather data has been received */}
          { Object.keys(currWeather).length !== 0 && (
            <>
              <CurrentWeather weather={currWeather} location={location} />
              <FiveDay fiveDayList={fiveDay} unitSymbol={unitSymbol}/>
            </>
          ) }

        </div>
      </div>
  )
}

export default App
