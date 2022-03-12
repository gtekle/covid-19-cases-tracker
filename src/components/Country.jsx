import React from 'react';
import PropTypes from 'prop-types';
import { BsArrowRightCircle } from 'react-icons/bs';
import getCounryMapUrl from '../utils/countryMapURL';

const Country = ({ country }) => {
  const imageUrl = getCounryMapUrl(country.name, 128);
  return (
    <li>
      <div className="country_img">
        <img src={imageUrl} alt={`${country.name} map`} />
        <BsArrowRightCircle />
      </div>
      <div className="country_detail">
        <p>{country.name}</p>
        <p>{country.today_confirmed.toLocaleString('en-US')}</p>
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
