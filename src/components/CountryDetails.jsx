import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import getCurrentDate from '../utils/currentDate';
import WORLD_MAP from '../assets/img/world-map.png';

const CountryDetails = ({ country }) => {
  const countryDetails = {
    id: country.id,
    name: country.name,
    todateConfirmed: country.today_confirmed,
    todateRecovered: country.today_recovered,
    todateDeaths: country.today_deaths,
    todateOpenCases: country.today_open_cases,
    todayNewConfirmed: country.today_new_confirmed,
    todayNewDeaths: country.today_new_Deaths,
    todayNewOpenCases: country.today_new_OpenCases,
    todayNewRecovered: country.today_new_Recovered,
  };
  const currentDate = getCurrentDate();
  const navigate = useNavigate();
  return (
    <div className="details_container">
      <div className="details_header">
        <div className="details_header_back">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaChevronLeft onClick={navigate(-1)} />
          </button>
          <span>{currentDate}</span>
        </div>
        <span> detail stats</span>
      </div>
      <div className="countries_list_hero">
        <img src={WORLD_MAP} alt="world map" />
        <div className="hero_text">
          <h2>{country.name}</h2>
          <span>
            {countryDetails.todateConfirmed && countryDetails.todateConfirmed.toLocaleString('en-US')}
          </span>
          <span> cases</span>
        </div>
      </div>
      <div className="all_stats_divider">
        <span>country detail stats</span>
      </div>
      <ul className="country_detail_stats">
        <li>
          <span>
            Todate confirmed cases
          </span>
          <span>
            {countryDetails.todateConfirmed && countryDetails.todateConfirmed.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Todate deaths
          </span>
          <span>
            {countryDetails.todateDeaths && countryDetails.todateDeaths.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Todate recovered
          </span>
          <span>
            {countryDetails.todateRecovered && countryDetails.todateRecovered.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Todate open cases
          </span>
          <span>
            {countryDetails.todateOpenCases && countryDetails.todateOpenCases.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new confirmed
          </span>
          <span>
            {countryDetails.todayNewConfirmed && countryDetails.todayNewConfirmed.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new recovered
          </span>
          <span>
            {countryDetails.todayNewRecovered && countryDetails.todayNewRecovered.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new open cases
          </span>
          <span>
            {countryDetails.todayNewOpenCases && countryDetails.todayNewOpenCases.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new recovered
          </span>
          <span>
            {countryDetails.todayNewRecovered && countryDetails.todayNewRecovered.toLocaleString('en-US')}
          </span>
        </li>
      </ul>
    </div>
  );
};

CountryDetails.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    today_confirmed: PropTypes.number,
    today_recovered: PropTypes.number,
    today_deaths: PropTypes.number,
    today_open_cases: PropTypes.number,
    today_new_confirmed: PropTypes.number,
    today_new_Deaths: PropTypes.number,
    today_new_OpenCases: PropTypes.number,
    today_new_Recovered: PropTypes.number,
  }).isRequired,
};

export default CountryDetails;
