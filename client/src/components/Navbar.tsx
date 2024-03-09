import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const Navbar = (props: { getWeather: (city: string) => void}) => {

    const [city, setCity] = useState("");
    // const [currWeather, setCurrWeather] = useState(null);

    function handleClickSubmit() {
        props.getWeather(city)
        setCity("")
    }

    function handleKeyboardSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            props.getWeather(city);
            setCity("");
        }
    }

    return (
        <div className="navbar container">
            <div className="links">
                <h2>Cloudy <FontAwesomeIcon icon={faSun}/></h2>
                <div>
                    <input type="text" value={city} onKeyDown={(event) => handleKeyboardSubmit(event)} onChange={(event) => setCity(event.target.value)} placeholder="Enter city" required/>
                    <button onClick={() => handleClickSubmit()}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </div>
            </div>
        </div>
    );
}