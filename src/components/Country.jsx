import React from 'react';
import PropTypes from 'prop-types';
// import { Card } from 'react-bootstrap';
import { BsArrowRightCircle } from 'react-icons/bs';

const Country = ({ country }) => (
  <li>
    <div className="country_img">
      <img src="https://raw.githubusercontent.com/gtekle/mapsicon/master/all/ad/128.png" alt="country map" />
      <BsArrowRightCircle />
    </div>
    <div className="country_detail">
      <p>{country.name}</p>
      <p>{country.today_confirmed.toLocaleString('en-US')}</p>
    </div>
  </li>
);

Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    today_confirmed: PropTypes.string.isRequired,
  }).isRequired,
};

export default Country;
