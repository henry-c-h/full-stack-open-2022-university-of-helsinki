import Country from './Country';
import { useState } from 'react';

const CountryList = ({ countries }) => {
  const [countryToShow, setCountryToShow] = useState(null);

  return (
    <div>
      {countries.length === 1 ? (
        <Country country={countries[0]} />
      ) : (
        countries.map((country) => (
          <div key={country.ccn3}>
            <p>
              {country.name.common}{' '}
              <button
                onClick={() => {
                  setCountryToShow(country);
                }}
              >
                show
              </button>
            </p>
            {countryToShow && countryToShow.ccn3 === country.ccn3 ? (
              <Country country={country} />
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default CountryList;
