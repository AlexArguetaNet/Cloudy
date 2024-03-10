import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const Navbar = (props: { getWeather: (city: string) => void}) => {

    const [city, setCity] = useState("");

    function handleClickSubmit(): void {
        props.getWeather(city)
        setCity("")
    }

    function handleKeyboardSubmit(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter" && city.length != 0) {
            props.getWeather(city);
            setCity("");
        }
    }

    return (
        <div className="navbar">
            <div className="links">
                <h2>Cloudy <FontAwesomeIcon icon={faSun}/></h2>
                <div>
                    <input type="text" 
                        name="city"
                        value={city} 
                        onKeyDown={(event) => handleKeyboardSubmit(event)} 
                        onChange={(event) => setCity(event.target.value)} 
                        placeholder="Enter city name" 
                        required
                    />
                    <button onClick={() => handleClickSubmit()}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </div>
            </div>
        </div>
    );
}