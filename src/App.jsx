import React, { useState, useEffect, useMemo } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { fetchCities, fetchCityForecast } from './api';
import { mapCity, mapForecast, cs } from './utils';

const App = () => {
  const [error, setError] = useState('');
  const [sortParam, setSortParam] = useState('');
  const [cities, setCities] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [activeCity, setActiveCity] = useState('');

  const getCities = async () => {
    try {
      const result = await fetchCities();
      setCities(result.map((c) => mapCity(c)));
      setError();
    } catch (e) {
      setError(e.message);
    }
  };

  // TODO: implement getting city forecast from the fetchCityForecast api function.
  // Hint: use the data setters functions extracted from useState at the top of the component
  const getCityForecast = async (key) => {
    // Implement under this line ⬇️
    try {
      const result = await fetchCityForecast(key);
      setFiveDayForecast(result.DailyForecasts.map((c) => mapForecast(c)));
      setError();
    } catch (e) {
      setError(e.message);
    }
  };

  // TODO: implement event handler on selecting a city from the list.
  // Hint: use the data setters functions extracted from useState at the top of the component
  const handleCitySelect = (key) => {
    // Implement under this line ⬇️
    getCityForecast(key);
    setActiveCity(key);
  };

  const handleSortSelect = () => {
    const fiveDayForecastCopy = [...fiveDayForecast];

    if (sortParam === 'minTemp') {
      fiveDayForecastCopy.sort((a, b) => a.minTemp - b.minTemp);
    }
    if (sortParam === 'maxTemp') {
      fiveDayForecastCopy.sort((a, b) => b.maxTemp - a.maxTemp);
    }
    if (sortParam === '') {
      fiveDayForecastCopy.sort((a, b) => (a.date > b.date ? 1 : -1));
    }
    setFiveDayForecast(fiveDayForecastCopy);
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    handleSortSelect();
  }, [sortParam]);

  return (
    <div>
      <h1>Weather app</h1>
      <div className="sort" onChange={(e) => setSortParam(e.target.value)}>
        <label htmlFor="none">
          Date{' '}
          <input
            type="radio"
            value={''}
            id="none"
            name="sort"
            defaultChecked={!sortParam}
          />
        </label>
        <label htmlFor="minTemp">
          Min Temp{' '}
          <input type="radio" value="minTemp" id="minTemp" name="sort" />
        </label>
        <label htmlFor="maxTemp">
          Max Temp{' '}
          <input type="radio" value="maxTemp" id="maxTemp" name="sort" />
        </label>
      </div>

      <div className="wrapper">
        <div className="cities_list">
          {cities?.map((city) => (
            <div
              className={cs('city', city.key === activeCity && 'active')}
              key={city.key}
              onClick={() => handleCitySelect(city.key)}
              data-testid="city_card"
            >
              <div className="city_name">{city.name}</div>
              {city.country}, {city.continent}
            </div>
          ))}
        </div>
        <div className="weather_schedule">
          {/*  TODO: Display weather card for each forecast day */}
          {/* Hint: use the data that will be set in fiveDayForecast */}
          {error ? (
            <p className="error">{error}</p>
          ) : (
            fiveDayForecast?.map((forecast) => (
              <WeatherCard key={forecast.date} {...forecast} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
