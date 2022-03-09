import React from 'react';
import PropTypes from 'prop-types';

const Region = ({ region }) => {
  const { id, name } = region;
  return <li key={id}>{name}</li>;
};

Region.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Region;
