import "../styles/CurrentWeather.css"
import tempHigh from "../assets/icons/temp_high.png";
import tempLow from "../assets/icons/temp_low.png";
import humidity from "../assets/icons/humidity.png";
import pressure from "../assets/icons/pressure.png";
import wind from "../assets/icons/wind.png";
import sunriseIcon from "../assets/icons/sunrise.png";
import sunsetIcon from "../assets/icons/sunset.png";
import visibility from "../assets/icons/visibility.png";
import cloudIcon from "../assets/icons/cloud.png";
import userIcon from "../assets/icons/user.png";

export const CurrentWeather = (props: { weather: any, location: any }) => {

    const { weather, location } = props;

    function getWindDirection(deg: number): string {
        if (deg >= 0 && deg <= 89) return "N";
        if (deg >= 90 && deg <= 179) return "E";
        if (deg >= 180 && deg <= 269) return "S";
        if (deg >= 270 && deg <= 360) return "W";
        return "n/a";
    }

    function formatDate(): string {

        const localDate = new Date(weather.dt * 1000);
        return localDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

    }

    function getTime(unixTime: number): string {

        const utcSeconds = unixTime + parseInt(weather.timezone);
        const utcMilliseconds = utcSeconds * 1000;
        const localDate = new Date(utcMilliseconds);

        let hour = localDate.getUTCHours();
        let minutes = localDate.getUTCMinutes().toString();
        let amOrPm = "AM"

        // Adjust hour to 12hr clock
        if (hour >= 13) {
            hour -= 12;
            amOrPm = "PM";
        }
        if (minutes.length == 1) minutes = `0${minutes}`;

        return `${hour}: ${minutes} ${amOrPm}`;

    }

    return (

        <div className="current-weather">
            <div className="content container">
                <div className="title">
                    <h2>Current Forecast</h2>
                    <p id="date">{formatDate()}</p>
                </div>

                <div className="curr-data main">
                    
                    <p className="location-text">{location.name}</p>
                    <p>{location.state !== "" && <>{`${location.state},`}</>} {location.country}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="img"/>
                    <p>{weather.weather[0].main}</p>
                    <h2>{Math.floor(weather.main.temp)}&deg; {weather.unitSymbols.temp} </h2>
                </div>
                <div className="curr-data temps">
                    
                    <div className="high-low">
                        <div>
                            <img src={tempHigh} alt="icon" />
                            <h4>High</h4>
                            <h3>{Math.floor(weather.main.temp_max)}&deg; {weather.unitSymbols.temp}</h3>
                        </div>
                        <div>
                            <img src={tempLow} alt="icon" />
                            <h4>Low</h4>
                            <h3>{Math.floor(weather.main.temp_min)}&deg; {weather.unitSymbols.temp}</h3>
                        </div>
                    </div>
                    <div className="wind">
                        <div>
                            <img src={wind} alt="icon" />
                            <h4>Wind</h4>
                            <h3>{Math.floor(weather.wind.speed)} {weather.unitSymbols.speed} {getWindDirection(weather.wind.deg)}</h3>
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
                <div className="feels-like container">
                    <p>Feels Like</p>
                    <img src={userIcon} alt="feels_like" />
                    <p>{Math.floor(weather.main.feels_like)}&deg; {weather.unitSymbols.temp}</p>
                </div>
                <div className="visibility container">
                    <div>
                        <p>Visibility</p>
                        <img src={visibility} alt="visibility" />
                        <p>{weather.visibility / 1000} {weather.unitSymbols.distance}</p>
                    </div>
                    <div>
                        <p>Cloudiness</p>
                        <img src={cloudIcon} alt="cloud" />
                        <p>{weather.clouds.all}%</p>
                    </div>
                </div>
                <div className="pressure container">
                    <p>Pressure</p>
                    <img src={pressure} alt="pressure" />
                    <p>{weather.main.pressure} hpa</p>
                </div>
                <div className="sun container">
                    <div>
                        <img src={sunriseIcon} alt="" />
                        <p>{getTime(parseInt(weather.sys.sunrise))}</p>
                        <p>Sunrise</p>
                    </div>
                    <div>
                        <img src={sunsetIcon} alt="" />
                        <p>{getTime(parseInt(weather.sys.sunset))}</p>
                        <p>Sunset</p>
                    </div>
                </div>

            </div>
        </div>

        
    );
}
