import React from 'react';
import PropTypes from 'prop-types';
import { BsArrowRightCircle } from 'react-icons/bs';

const Region = ({ region }) => {
  const { id, name } = region;
  return (
    <li key={id}>
      <p>{name}</p>
      <div className="region_cases">
        <p>
          {region.today_confirmed.toLocaleString('en-US')}
          <span> cases</span>
        </p>
        <BsArrowRightCircle />
      </div>
    </li>
  );
};

Region.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    today_confirmed: PropTypes.number.isRequired,
  }).isRequired,
};

export default Region;
