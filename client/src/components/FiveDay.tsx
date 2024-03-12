import "../styles/FiveDay.css";

export const FiveDay = (props: { fiveDayList: any, unitSymbol: any }) => {

    const { fiveDayList, unitSymbol } = props;

    return (
        <div className="five-day container">
            <h2 className="title">Five day Forecast</h2>
            <div className="list">
            {fiveDayList.map((elem: any, index: number) => {
                elem.unitSymbol = unitSymbol;
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
            <p>{Math.floor(day.temp.day)}&deg; {day.unitSymbol}</p>
            <p>{day.weather[0].main}</p>
        </div>
    );
}