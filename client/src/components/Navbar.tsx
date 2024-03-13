import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export const Navbar = (props: { getWeather: (city: string, units: string) => void }) => {

    const [city, setCity] = useState("");
    const [units, setUnits] = useState("");

    function handleClickSubmit(): void {
        props.getWeather(city, units)
        setCity("")
    }

    function handleKeyboardSubmit(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter" && city.length != 0) {
            props.getWeather(city, units);
            setCity("");
        }
    }

    function handleUnitChange(unitStr: string): void {
        
        // Reset unit values
        setUnits(unitStr);
        window.localStorage.setItem("units", unitStr);

        // Get weather with new units
        props.getWeather(window.localStorage.getItem("city") || "charlotte", window.localStorage.getItem("units") || "imperial");
    }

    // Set the last units that were used
    useEffect(() => {
        setUnits(window.localStorage.getItem("units") || "imperial");
    }, []);

    return (
        <div className="navbar">
            <div className="links">
                <h2 id="title">Cloudy <FontAwesomeIcon icon={faSun}/></h2>
                <div className="controls">
                    <div className="select-div">
                        <p>Units:</p>
                        <select name="units" aria-label="Units" id="" value={units} onChange={(event) => handleUnitChange(event.target.value)}>
                            <option value="imperial">Imperial</option>
                            <option value="metric">Metric</option>
                        </select>
            
                    </div>
                    <input type="text" 
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