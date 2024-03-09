import "../styles/CurrentWeather.css"

export const CurrentWeather = (props: { data: any}) => {

    const weather = props.data;

    return (
        <div className="current-weather weather container">
            <div className="curr-data temps">
                <p>{weather.name}</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="img"/>
                <p>{weather.main.temp} &deg;</p>
                <p>{weather.weather[0].main}</p>
                <div>
                    <p>H: {weather.main.temp_max} &deg;</p>
                    <p>M: {weather.main.temp_min} &deg;</p>
                </div>
            </div>
            <div className="curr-data humidity">
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Pressure: {weather.main.pressure} inHg</p>
            </div>
        </div>
    );
}
