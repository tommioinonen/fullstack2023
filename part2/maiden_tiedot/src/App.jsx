import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (filter) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          );
          setCountries(filteredCountries);
          if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0]);
          } else {
            setSelectedCountry(null);
          }
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [filter]);

  useEffect(() => {
    if (selectedCountry) {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const capital = selectedCountry.capital;
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeather(response.data);
        });
    }
  }, [selectedCountry]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Find countries</h1>
      <input value={filter} onChange={handleFilterChange} />
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map(country => (
            <li key={country.ccn3}>
              {country.name.common} <button onClick={() => handleShowCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>capital: {selectedCountry.capital}</p>
          <p>area: {selectedCountry.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.svg} alt={`Flag of ${selectedCountry.name.common}`} width="250" />
          {weather && (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>temperature: {weather.main.temp} Celsius</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
