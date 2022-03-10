import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import Region from './Region';
import getCounryMapUrl from '../utils/countryMapURL';

const RegionsList = ({ country }) => {
  const { regions } = country;
  const navigate = useNavigate();
  const imageUrl = getCounryMapUrl(country.name, 128);
  return (
    <div className="regions_list_container">
      <div className="regions_list_header">
        <div className="regions_list_header_back">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaChevronLeft onClick={navigate(-1)} />
          </button>
        </div>
        <span>region stats</span>
      </div>
      <div className="countries_list_hero">
        <img src={imageUrl} alt="world map" />
        <div className="hero_text">
          <h2>{country.name}</h2>
          <span>
            {country.today_confirmed && country.today_confirmed.toLocaleString('en-US')}
          </span>
          <span> cases</span>
        </div>
      </div>
      <div className="all_stats_divider">
        <span>Stats by region</span>
      </div>
      <ul className="regions_list">
        {
          regions.map((region) => (
            <Link key={region.id} to={`${region.id}`}>
              <Region region={region} />
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

RegionsList.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    today_confirmed: PropTypes.number.isRequired,
    regions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

export default RegionsList;
