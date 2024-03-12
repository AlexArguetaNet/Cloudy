import './styles/App.css'
import { Navbar } from './components/Navbar'
import { CurrentWeather } from './components/CurrentWeather';
import { FiveDay } from './components/FiveDay';
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from 'react';
import { LoadingModal } from './components/LoadingModal';

function App() {

  // TODO: COntinue finding day/night images for weather conditions

  const [currWeather, setCurrWeather] = useState({});
  const [location, setLocation] = useState({});
  const [fiveDay, setFiveDay] = useState({});
  const [loading, setLoading] = useState(false);

  // Apply background image to the body
  // Icon from response may help
  // in getting the time for each search city
  const [imgUrl, setImgUrl] = useState("");
  window.document.body.style.backgroundImage = `url(${imgUrl})`;


  function getWeather(city: string) {

    setLoading(true);

    axios.post("http://localhost:4001/", { city: city.split(' ').join('+') })
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
        } else if (icon == "Mist") {
          cond = "mist";
        } else {
          cond = "none";
        }


        let dt = res.data.current.dt;
        let timezone = res.data.current.timezone;

        // Get current time in target city
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
        window.localStorage.setItem("city", city);

      }

      setLoading(false);
    })
    .catch(err => console.log(err));
  }



  // Get weather data on initial render
  useEffect(() => {
    
    let localCity = window.localStorage.getItem("city");
    localCity ? getWeather(localCity || "") : getWeather("Charlotte");
    
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
              <FiveDay data={fiveDay} />
            </>
          ) }

        </div>
      </div>
  )
}

export default App
