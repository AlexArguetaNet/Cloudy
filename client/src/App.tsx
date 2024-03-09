import './styles/App.css'
import { Navbar } from './components/Navbar'
import { CurrentWeather } from './components/CurrentWeather';
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from 'react';
import sunny from "./assets/sunny.jpg";
import rain from "./assets/rain.jpg";
import cloudy from "./assets/cloudy.jpg";

function App() {

  const [currWeather, setCurrWeather] = useState({});
  const [backgorund, setBackground] = useState({});

  const myStyle = {
    backgroundImage: `url(${backgorund})`,
    backgroundRepeat: "no-repeat",
    height: "100%",
    backgroundSize: "cover"
  }


  function getWeather(city: string) {

    axios.post("http://localhost:4001/", { city: city.split(' ').join('+') })
    .then((res: AxiosResponse) => {

      if (res.data.error) {
        alert(res.data.msg);
      } else {

        let icon = res.data.current.weather[0].main

        // Change background accroding to forecast
        if (icon == "Rain") {
          setBackground(rain);
        } else if (icon == "Clouds") {
          setBackground(cloudy);
        } else {
          setBackground(sunny)
        }

        // Get current and fiveDay weather data from response
        setCurrWeather(res.data.current);
        window.localStorage.setItem("city", city);

      }

    })
    .catch(err => console.log(err));
    
  }


  // Get weather data on initial render
  useEffect(() => {
    
    let localCity = window.localStorage.getItem("city");
    localCity ? getWeather(localCity || "") : getWeather("Charlotte");
    
  }, []);

  return (
      <div className="app" style={myStyle}>
        
        <Navbar  getWeather={getWeather}/>
        <div className="weather-container">

          {/* Only render UI when weather data has been recieved */}
          { Object.keys(currWeather).length !== 0 && <CurrentWeather data={currWeather}/> }

        </div>
        

      </div>
  )
}

export default App
