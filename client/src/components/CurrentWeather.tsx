import "../styles/CurrentWeather.css"

export const CurrentWeather = (props: { data: any}) => {

    const weather = props.data;

    return (
        <div className="current-weather weather container">
            <div>
                <p>{weather.name}</p>
                <p>{weather.main.temp} &deg;</p>
                <p>{weather.weather[0].main}</p>
                <p>H: {weather.main.temp_max} &deg;</p>
                <p>M: {weather.main.temp_min} &deg;</p>
            </div>
            <div>

            </div>
        </div>
    );
}
