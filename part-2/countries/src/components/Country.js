import { useState, useEffect } from 'react';
import axios from 'axios';
import LanguagesList from './LanguagesList';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.ccn3}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country.capital, country.ccn3]);

  return (
    <article>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <section>
        <h3>Languages:</h3>
        <LanguagesList languages={country.languages} />
        <img
          src={country.flags.png}
          alt={`flag of ${country.name.common}`}
          style={{ width: '200px' }}
        />
      </section>
      {weather ? (
        <section>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            style={{ width: '100px' }}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </section>
      ) : null}
    </article>
  );
};

export default Country;
