import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CountryDetails = ({ country }) => {
  const { id, name } = country;
  const navigate = useNavigate();
  return (
    <div>
      <h2>Country Details</h2>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <p>{id}</p>
      <p>{name}</p>
    </div>
  );
};

CountryDetails.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default CountryDetails;
