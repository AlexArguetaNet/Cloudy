import "../styles/CurrentWeather.css"
import tempHigh from "../assets/temp_high.png";
import tempLow from "../assets/temp_low.png";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import wind from "../assets/wind.png";

export const CurrentWeather = (props: { data: any }) => {

    const weather = props.data;

    function getWindDirection(deg: number): string {
        if (deg >= 0 && deg <= 89) return "North";
        if (deg >= 90 && deg <= 179) return "East";
        if (deg >= 180 && deg <= 269) return "South";
        if (deg >= 270 && deg <= 360) return "West";
        return "n/a";
    }

    return (
        <div className="current-weather weather container">
            <div className="curr-data main">
                <p className="location-text">{weather.name}</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="img"/>
                <p>{weather.weather[0].main}</p>
                <h2>{weather.main.temp} &deg;</h2>
            </div>
            <div className="curr-data temps">
                
                <div className="high-low">
                    <div>
                        <img src={tempHigh} alt="icon" />
                        <h4>High</h4>
                        <h3>{weather.main.temp_max} &deg;</h3>
                    </div>
                    <div>
                        <img src={tempLow} alt="icon" />
                        <h4>Low</h4>
                        <h3>{weather.main.temp_min} &deg;</h3>
                    </div>
                </div>
                <div className="wind">
                    <div>
                        <img src={wind} alt="icon" />
                        <h4>Wind</h4>
                        <h3>{weather.wind.speed} mph</h3>
                    </div>
                    <div>
                        <h4>Wind Direction</h4>
                        <h3>{getWindDirection(parseInt(weather.wind.deg))}</h3>
                    </div>
                </div>
        
            </div>
        </div>
    );
}
