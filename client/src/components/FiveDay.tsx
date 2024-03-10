import "../styles/FiveDay.css";

export const FiveDay = (props: { data: any }) => {

    const fiveDay: object[] = props.data;

    console.log(fiveDay[0]);

    return (
        <div className="five-day container">
            {fiveDay.map((elem: {}, index: number) => {
                return <ListItem key={index} weather={elem}/>
            })}
        </div>
    );
}

const ListItem = (props: { weather: any}) => {

    const day = props.weather;

    console.log(day);
    

    return (
        <div className="list-item">
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
            <p>{Math.floor(day.temp.day)}&deg;</p>
            
        </div>
    );
}