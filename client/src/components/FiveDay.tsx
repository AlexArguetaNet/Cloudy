import { useEffect, useState } from "react";
import "../styles/FiveDay.css";

export const FiveDay = (props: { data: any }) => {

    const fiveDay: object[] = props.data;

    return (
        <div className="five-day container">
            <h2 className="title">Five day Forecast</h2>
            {fiveDay.map((elem: any, index: number) => {

                return <ListItem key={index} weather={elem} />
            })}
        </div>
    );
}

const ListItem = (props: { weather: any }) => {

    const day = props.weather;
    
    function getDayName(unixTime: number): string {

        let mDate = new Date(unixTime * 1000);
        return `${mDate.toLocaleDateString('en-us', { weekday: "short" })} ${mDate.getDate()}`;

    }

    return (
        <div className="list-item">
            <p>{getDayName(day.dt)}</p>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
            <p>{Math.floor(day.temp.day)}&deg;</p>
            <p>{day.weather[0].main}</p>
        </div>
    );
}