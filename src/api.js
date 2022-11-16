import cities from './api/citiesList';
import forecast from './api/forecasts';

export const fetchCities = async () => {
  return new Promise((resolve) => {
    resolve(cities);
  })
}

// TODO: Bonues: change the code to handle cases in which the city key doesn't exist in the forecast data.
export const fetchCityForecast = async (key) => {
   return new Promise((resolve, reject) => {
    if (forecast.hasOwnProperty(key)) {
      resolve(forecast[key]);
    }
  });
}

