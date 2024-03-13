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
  // TODO: Use button to access current location instead?

  const [currWeather, setCurrWeather] = useState({});
  const [location, setLocation] = useState({});
  const [fiveDay, setFiveDay] = useState({});
  const [loading, setLoading] = useState(false);
  const [unitSymbol, setUnitSymbol] = useState("");
  const [cordFetched, setCordFetched] = useState(false);

  // Apply background image to the body
  // Icon from response may help
  // in getting the time for each search city
  const [imgUrl, setImgUrl] = useState("");
  window.document.body.style.backgroundImage = `url(${imgUrl})`;


  function getWeather(city: string, units: string, cords?: object) {

    setLoading(true);

    // Set timeout
    axios.defaults.timeout = 15000;

    axios.post("http://localhost:4001/", { city: city.split(' ').join('+'), units, cords })
    .then((res: AxiosResponse) => {

      if (res.data.error) {
        alert(res.data.msg);
      } else {

        let cond: string;
        let picTime: string;

        // Check current weather condition
        let icon = res.data.current.weather[0].main
        if (icon == "Clear") {
          cond = "clear";
        } else if (icon == "Clouds") {
          cond = "clouds";
        }  else if (icon == "Rain") {
          cond = "rain";
        } else if (icon == "Snow") {
          cond = "snow";
        } else if (icon == "Mist" || icon == "Fog") {
          cond = "mist";
        } else {
          cond = "none";
        }


        // Get current time in target city
        let dt = res.data.current.dt;
        let timezone = res.data.current.timezone;
        
        const utcSeconds = parseInt(dt) + parseInt(timezone);
        const utcMilliseconds = utcSeconds * 1000;
        const localDate = new Date(utcMilliseconds);
      
        // Check if it is day or night
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
  console.log(permission);  
  if (permission.loading == false && !window.localStorage.getItem("fetchedCords")) {

    // Check if the user allowed permission to user their location
    if (permission.error == null) {
      window.localStorage.setItem("fetchedCords", "true");
      setCordFetched(true); // Boolean to stop re-renders after current cords. are set
      getWeather("", "imperial", { lat: permission.latitude, lon: permission.longitude });
    }

  }
  

  // Get weather data on initial render
  useEffect(() => {
    
      // Check for units
      let units = window.localStorage.getItem("units");
      if (!units) units = "imperial";

      let localCity = window.localStorage.getItem("city");
      localCity ? getWeather(localCity || "", units || "") : getWeather("Charlotte", units || "");
    
  }, []);





  return (
    // Set the background images according to the current forecast
      <div className="app">

        { loading && <LoadingModal/>}
        
        <Navbar  getWeather={getWeather}/>
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
