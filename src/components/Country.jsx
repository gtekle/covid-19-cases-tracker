import React from 'react';
import PropTypes from 'prop-types';
import { BsArrowRightCircle } from 'react-icons/bs';
import getCounryMapUrl from '../utils/countryMapURL';

const Country = ({ country }) => {
  const imageUrl = getCounryMapUrl(country.country, 128);
  return (
    <li>
      <div className="country_img">
        <img src={imageUrl} alt={`${country.country} map`} />
        <BsArrowRightCircle />
      </div>
      <div className="country_detail">
        <p>{country.country}</p>
        <p>{country.cases.toLocaleString('en-US')}</p>
      </div>
    </li>
  );
};

Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    today_confirmed: PropTypes.number.isRequired,
  }).isRequired,
};

export default Country;
