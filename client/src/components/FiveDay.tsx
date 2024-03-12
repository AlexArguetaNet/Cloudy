import "../styles/FiveDay.css";

export const FiveDay = (props: { data: any }) => {

    const fiveDay: object[] = props.data;

    return (
        <div className="five-day container">
            <h2 className="title">Five day Forecast</h2>
            <div className="list">
            {fiveDay.map((elem: any, index: number) => {

                return <ListItem key={index} weather={elem} index={index}/>
            })}
            </div>
        </div>
    );
}

const ListItem = (props: { weather: any, index: number }) => {

    const day = props.weather;
    const { index } = props;
    
    function getDayName(unixTime: number): string {

        let mDate = new Date(unixTime * 1000);
        return `${mDate.toLocaleDateString('en-us', { weekday: "short" })} ${mDate.getDate()}`;

    }

    return (
        <div className="list-item">
            <p>{ index == 0 ? <>Today</> : getDayName(day.dt)}</p>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
            <p>{Math.floor(day.temp.day)}&deg;</p>
            <p>{day.weather[0].main}</p>
        </div>
    );
}