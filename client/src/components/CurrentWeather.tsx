import "../styles/CurrentWeather.css"
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";

export const CurrentWeather = (props: { data: any }) => {

    const weather = props.data;

    return (
        <div className="current-weather weather container">
            <div className="curr-data temps">
                <p className="location-text">{weather.name}</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="img"/>
                <p>{weather.main.temp} &deg;</p>
                <p>{weather.weather[0].main}</p>
                <div>
                    <p>H: {weather.main.temp_max} &deg;</p>
                    <p>M: {weather.main.temp_min} &deg;</p>
                </div>
            </div>
            <div className="curr-data humidity">
                <div>
                    <img src={humidity} alt="icon" />
                    <h3>Humidity</h3>
                    <p>{weather.main.humidity}%</p>
                </div>
                <div>
                    <img src={pressure} alt="icon" />
                    <h3>Pressure</h3>
                    <p>{weather.main.pressure}</p>
                </div>
            </div>
        </div>
    );
}
