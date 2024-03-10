import './styles/App.css'
import { Navbar } from './components/Navbar'
import { CurrentWeather } from './components/CurrentWeather';
import { FiveDay } from './components/FiveDay';
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from 'react';
import sunny from "./assets/sunny.jpg";
import rain from "./assets/rain.jpg";
import cloudy from "./assets/cloudy.jpg";
import mist from "./assets/mist.jpg";
import snowingNightPic from "./assets/n-snowing.jpg";

function App() {

  const [currWeather, setCurrWeather] = useState({});
  const [location, setLocation] = useState({});
  const [fiveDay, setFiveDay] = useState({});
  const [background, setBackground] = useState({});
  const [loading, setLoading] = useState(false);

  const myStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    height: "120%",
    backgroundSize: "cover"
  }


  function showLoadingModal() {
    return (
      <div className="loading">
        <h3>Loading</h3>
        <div className="lds-dual-ring"></div>
      </div>
    );
  }


  function getWeather(city: string) {

    setLoading(true);

    axios.post("http://localhost:4001/", { city: city.split(' ').join('+') })
    .then((res: AxiosResponse) => {

      if (res.data.error) {
        alert(res.data.msg);
      } else {

        let icon = res.data.current.weather[0].main

        // Change background according to forecast
        if (icon == "Rain") {
          setBackground(rain);
        } else if (icon == "Clouds") {
          setBackground(cloudy);
        } else if (icon == "Mist" || icon == "Haze") {
          setBackground(mist);
        } else if (icon == "Snow") {
          setBackground(snowingNightPic);
        } else {
          setBackground(sunny)
        }

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
      <div className="app" style={myStyle}>

        { loading && showLoadingModal() }
        
        <Navbar  getWeather={getWeather}/>
        <div className="weather-container">

          {/* Only render UI when weather data has been received */}
          { Object.keys(currWeather).length !== 0 && (
            <>
              <CurrentWeather weather={currWeather} location={location}/>
              <FiveDay data={fiveDay}/>
            </>
          ) }

        </div>
        

      </div>
  )
}

export default App
