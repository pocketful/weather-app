export const mapCity = (city) => ({
  name: city.EnglishName,
  country: city.Country.LocalizedName,
  continent: city.Region.LocalizedName,
  key: city.Key,
});

// TODO: Map the forecast to the data matching the city weather card.
// Hint: You will need to refer to the shape of the forecst data. It's located in "__mock__/api/forecasts.js"
export const mapForecast = (forecast) => ({
  // We will need to get from the forecast: maxTemp, minTemp, summary, date and icon.
  // Implement under this line ⬇️
  date: forecast.Date,
  summary: forecast.Day.IconPhrase,
  minTemp: forecast.Temperature.Minimum.Value,
  maxTemp: forecast.Temperature.Maximum.Value,
  icon: forecast.Day.Icon,
});

export const cs = (...classnames) => {
  return classnames.filter(Boolean).join(' ')
}
