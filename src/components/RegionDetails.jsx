import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RegionDetails = ({ region }) => {
  const { id, name } = region;
  const navigate = useNavigate();
  return (
    <div>
      <h2>Region Details</h2>
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

RegionDetails.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default RegionDetails;
