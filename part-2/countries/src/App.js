import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [countries, setCountries] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (searchValue) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then((response) => {
          if (response.data.length > 10) {
            setCountries([]);
            setMessage('Too many matches, specify another filter');
          } else {
            setCountries(response.data);
            setMessage('');
          }
        })
        .catch((exception) => {
          if (exception.response.status === 404) {
            setCountries([]);
            setMessage('Country not found. Please try a different search.');
          }
        });
    }
  }, [searchValue]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setCountries([]);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        find countries{' '}
        <input type="text" value={searchValue} onChange={handleChange} />
      </div>
      {message ? <p>{message}</p> : null}
      {countries ? <CountryList countries={countries} /> : null}
    </div>
  );
};

export default App;
