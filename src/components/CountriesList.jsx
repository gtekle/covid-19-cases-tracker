import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import WORLD_MAP from '../assets/img/world-map.png';
import getCurrentDate from '../utils/currentDate';

import { fetchCovidStats } from '../store/covidStats';
import Country from './Country';
import CustomDatePicker from './CustomDatePicker';

export const CountriesList = () => {
  const currentDate = getCurrentDate();
  const dispatch = useDispatch();
  const { casesByCountry, totalCases } = useSelector((state) => state);
  let alternatingBackgroundColor = 'default_color';
  useEffect(() => {
    if (Object.keys(casesByCountry).length === 0) dispatch(fetchCovidStats({ date: currentDate }));
  }, []);
  return (
    <div className="countries_list_container">
      <div className="countries_list_header">
        <div className="countries_list_header_back">
          <FaChevronLeft />
          <span>{totalCases.date}</span>
        </div>
        <span>All Stats</span>
        <div className="pick_date">
          <CustomDatePicker />
        </div>
      </div>
      <div className="countries_list_hero">
        <img src={WORLD_MAP} alt="world map" />
        <div className="hero_text">
          <h1>Global</h1>
          <span>{totalCases.today_confirmed && totalCases.today_confirmed.toLocaleString('en-US')}</span>
          <br />
          <span>cases</span>
        </div>
      </div>
      <div className="all_stats_divider">
        <span>all stats - todate</span>
      </div>
      <div className="all_stats_detail">
        <span>
          <b>{totalCases.today_confirmed && totalCases.today_confirmed.toLocaleString('en-US')}</b>
          <br />
          Confirmed
        </span>
        <span>
          <b>{totalCases.today_deaths && totalCases.today_deaths.toLocaleString('en-US')}</b>
          <br />
          Deaths
        </span>
        <span>
          <b>{totalCases.today_recovered && totalCases.today_recovered.toLocaleString('en-US')}</b>
          <br />
          Recovered
        </span>
        <span>
          <b>{totalCases.today_open_cases && totalCases.today_open_cases.toLocaleString('en-US')}</b>
          <br />
          Open Cases
        </span>
      </div>
      <div className="stats_by_country_divider">
        <span>stats by country</span>
      </div>
      <ul className="countries_list">
        {
          Object.keys(casesByCountry).map(
            (country, idx) => {
              if ((idx + 1) % 2 === 0) {
                if (alternatingBackgroundColor === 'default_color') {
                  alternatingBackgroundColor = 'other_color';
                } else {
                  alternatingBackgroundColor = 'default_color';
                }
              }
              return (
                <Link key={country} data-testid={`${country.id}-testId`} to={`/${country}`} className={alternatingBackgroundColor}>
                  <Country country={casesByCountry[country]} />
                </Link>
              );
            },
          )
        }
      </ul>
    </div>
  );
};

export default CountriesList;
