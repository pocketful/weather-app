import React from 'react';
import './style.css';

// AccuWeather icons documentation: https://developer.accuweather.com/weather-icons
const getIcon = (icon) =>
  `https://developer.accuweather.com/sites/default/files/${icon}-s.png`;

// TODO: Implement weather card based on the design from the screenshot in the instructions.
export const WeatherCard = (props) => (
  <div className="weather_card" data-testid="weather_card">
    {/* Implement under this line ⬇️ */}
    <p className="card_date">{new Date(props.date).toDateString()}</p>
    <p className="card_summary">{props.summary}</p>
    <div className="card_temp">
      <div>
        <p>Temperatures:</p>
        <p>min {props.minTemp}</p>
        <p>max {props.maxTemp}</p>
      </div>
      <img src="https://developer.accuweather.com/sites/default/files/01-s.png" alt="weather icon" />
    </div>
  </div>
);
