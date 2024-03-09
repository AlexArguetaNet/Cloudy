import './styles/App.css'
import { Navbar } from './components/Navbar'
import { CurrentWeather } from './components/CurrentWeather';
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from 'react';

function App() {

  const [currWeather, setCurrWeather] = useState({});

  function getWeather(city: string) {

    axios.post("http://localhost:4001/", { city })
    .then((res: AxiosResponse) => {

      if (res.data.error) {
        alert(res.data.msg);
      } else {

        // Get current and fiveDay weather data from response
        setCurrWeather(res.data.current);

      }

    })
    .catch(err => console.log(err));
    
  }


  // Get weather data on initial render
  useEffect(() => {
    getWeather("Charlotte");
  }, []);

  return (
    <>
      <div className="app">
        
        <Navbar  getWeather={getWeather}/>

        <div className="weather-container">

          {/* Only render UI when weather data has been recieved */}
          { Object.keys(currWeather).length !== 0 && <CurrentWeather data={currWeather}/> }

        </div>
        

      </div>
    </>
  )
}

export default App
