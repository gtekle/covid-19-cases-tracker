import React from 'react';
import PropTypes from 'prop-types';

const Country = ({ country }) => (
  <li>
    {country.name}
  </li>
);

Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Country;
