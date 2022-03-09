import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { FaChevronLeft } from 'react-icons/fa';
import WORLD_MAP from '../assets/img/world-map.png';

import { fetchCovidStats } from '../store/covidStats';
import Country from './Country';

const CountriesList = () => {
  const today = DateTime.now().toISODate();
  const dispatch = useDispatch();
  const { casesByCountry, totalCases } = useSelector((state) => state);
  let alternatingBackgroundColor = 'default_color';
  useEffect(async () => {
    if (Object.keys(casesByCountry).length === 0) dispatch(fetchCovidStats({ date: today }));
  }, []);
  return (
    <div className="countries_list_container">
      <div className="countries_list_header">
        <div className="countries_list_header_back">
          <FaChevronLeft />
          <span>{today}</span>
        </div>
        <span>All Stats</span>
      </div>
      <div className="countries_list_hero">
        <img src={WORLD_MAP} alt="world map" />
        <div className="hero_text">
          <h1>Worldwide</h1>
          <span>{totalCases.today_confirmed.toLocaleString('en-US')}</span>
        </div>
      </div>
      <div className="all_stats_divider">
        <span>all stats</span>
      </div>
      <div className="all_stats_detail">
        <p>
          Todate Confirmed Cases:
          {totalCases.today_confirmed.toLocaleString('en-US')}
        </p>
        <p>
          Todate Deaths:
          {totalCases.today_deaths.toLocaleString('en-US')}
        </p>
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
                <Link key={country} to={country} className={alternatingBackgroundColor}>
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
