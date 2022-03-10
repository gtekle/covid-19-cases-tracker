import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import getCurrentDate from '../utils/currentDate';

const RegionDetails = ({ region }) => {
  const regionDetails = {
    id: region.id,
    name: region.name,
    todateConfirmed: region.today_confirmed,
    todateRecovered: region.today_recovered,
    todateDeaths: region.today_deaths,
    todateOpenCases: region.today_open_cases,
    todayNewConfirmed: region.today_new_confirmed,
    todayNewDeaths: region.today_new_Deaths,
    todayNewOpenCases: region.today_new_OpenCases,
    todayNewRecovered: region.today_new_Recovered,
  };
  const currentDate = getCurrentDate();
  const navigate = useNavigate();
  return (
    <div>
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
        <div className="hero_text">
          <h2>{regionDetails.name}</h2>
          <span>
            {regionDetails.todateConfirmed && regionDetails.todateConfirmed.toLocaleString('en-US')}
          </span>
          <span> cases</span>
        </div>
      </div>
      <div className="all_stats_divider">
        <span>region detail stats</span>
      </div>
      <ul className="country_detail_stats">
        <li>
          <span>
            Todate confirmed cases
          </span>
          <span>
            {regionDetails.todateConfirmed && regionDetails.todateConfirmed.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Todate deaths
          </span>
          <span>
            {regionDetails.todateDeaths && regionDetails.todateDeaths.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Todate recovered
          </span>
          <span>
            {regionDetails.todateRecovered && regionDetails.todateRecovered.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Todate open cases
          </span>
          <span>
            {regionDetails.todateOpenCases && regionDetails.todateOpenCases.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new confirmed
          </span>
          <span>
            {regionDetails.todayNewConfirmed && regionDetails.todayNewConfirmed.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new recovered
          </span>
          <span>
            {regionDetails.todayNewRecovered && regionDetails.todayNewRecovered.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new open cases
          </span>
          <span>
            {regionDetails.todayNewOpenCases && regionDetails.todayNewOpenCases.toLocaleString('en-US')}
          </span>
        </li>
        <li>
          <span>
            Today new recovered
          </span>
          <span>
            {regionDetails.todayNewRecovered && regionDetails.todayNewRecovered.toLocaleString('en-US')}
          </span>
        </li>
      </ul>
    </div>
  );
};

RegionDetails.propTypes = {
  region: PropTypes.shape({
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

export default RegionDetails;
