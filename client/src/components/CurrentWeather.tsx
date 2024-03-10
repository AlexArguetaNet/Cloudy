import "../styles/CurrentWeather.css"
import tempHigh from "../assets/temp_high.png";
import tempLow from "../assets/temp_low.png";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import wind from "../assets/wind.png";
import sunriseIcon from "../assets/sunrise.png";
import sunsetIcon from "../assets/sunset.png";
import visibility from "../assets/visibility.png";

export const CurrentWeather = (props: { data: any }) => {

    const weather = props.data;

    function getWindDirection(deg: number): string {
        if (deg >= 0 && deg <= 89) return "N";
        if (deg >= 90 && deg <= 179) return "E";
        if (deg >= 180 && deg <= 269) return "S";
        if (deg >= 270 && deg <= 360) return "W";
        return "n/a";
    }

    function getTime(unixTime: number): string {

        // TODO: Convert unix time into local time 
        const mDate = new Date(unixTime * 1000);
        return `${mDate.getHours()} : ${mDate.getMinutes()}`

    }

    return (

        <div className="current-weather">
            <div className="content container">
                <div className="curr-data main">
                    <h2 className="title">Current Forecast</h2>
                    <p className="location-text">{weather.name}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="img"/>
                    <p>{weather.weather[0].main}</p>
                    <h2>{Math.floor(weather.main.temp)} &deg;</h2>
                </div>
                <div className="curr-data temps">
                    
                    <div className="high-low">
                        <div>
                            <img src={tempHigh} alt="icon" />
                            <h4>High</h4>
                            <h3>{Math.floor(weather.main.temp_max)} &deg;</h3>
                        </div>
                        <div>
                            <img src={tempLow} alt="icon" />
                            <h4>Low</h4>
                            <h3>{Math.floor(weather.main.temp_min)} &deg;</h3>
                        </div>
                    </div>
                    <div className="wind">
                        <div>
                            <img src={wind} alt="icon" />
                            <h4>Wind</h4>
                            <h3>{Math.floor(weather.wind.speed)} mph {getWindDirection(weather.wind.deg)}</h3>
                        </div>
                        <div>
                            <img src={humidity} alt="humidity" />
                            <h4>Humidity</h4>
                            <h3>{weather.main.humidity}%</h3>
                        </div>
                    </div>
            
                </div>
            </div>
            <div className="second-row">
                <div className="sun container">
                    <div>
                        <img src={sunriseIcon} alt="" />
                        <p>{getTime(parseInt(weather.sys.sunrise))} AM</p>
                        <p>Sunirse</p>
                    </div>
                    <div>
                        <img src={sunsetIcon} alt="" />
                        <p>{getTime(parseInt(weather.sys.sunset))} PM</p>
                        <p>Sunset</p>
                    </div>
                </div>
                <div className="pressure container">
                    <p>Pressure</p>
                    <img src={pressure} alt="pressure" />
                    <p>{weather.main.pressure} hpa</p>
                </div>
                <div className="visibility container">
                    <p>Visibility</p>
                    <img src={visibility} alt="visibility" />
                    <p>{weather.visibility / 1000} km</p>
                </div>

            </div>
        </div>

        
    );
}
