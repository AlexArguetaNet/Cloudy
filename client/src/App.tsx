import './styles/App.css'
import { Navbar } from './components/Navbar'
import axios from "axios";
import { useState } from 'react';

function App() {

  const [city, setCity] = useState("");

  function getWeather(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();
    let searchKey: string;

    // Set default city if there is none
    city === "" ? searchKey = "Charlotte" : searchKey = city;

    axios.post("http://localhost:4001/", { city: searchKey })
    .then((response) => {

      console.log(response.data);
      setCity("");

    })
    .catch(err => alert(err));
    
  }

  return (
    <>
      <div className="app">
        
        <Navbar city={city} setCity={setCity} onSubmit={getWeather}/>

      </div>
    </>
  )
}

export default App
