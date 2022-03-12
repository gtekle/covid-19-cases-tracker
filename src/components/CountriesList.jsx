import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaSearch } from 'react-icons/fa';

import WORLD_MAP from '../assets/img/world-map.png';
import getCurrentDate from '../utils/currentDate';

import { fetchCovidStats, filterCountriesByName } from '../store/covidStats';
import Country from './Country';
import CustomDatePicker from './CustomDatePicker';

const CountriesList = () => {
  const [countrName, setCountryName] = useState('');
  const [searchInputStatus, setSearchInputStatus] = useState(false);
  const currentDate = getCurrentDate();
  const dispatch = useDispatch();
  const { casesByCountry, totalCases, filteredCountries } = useSelector((state) => state);
  let alternatingBackgroundColor = 'default_color';

  useEffect(() => {
    if (Object.keys(casesByCountry).length === 0) dispatch(fetchCovidStats({ date: currentDate }));
  }, []);
  
  useEffect(() => {
    if (casesByCountry) dispatch(filterCountriesByName({countryName: countrName, casesByCountry}));
  }, [casesByCountry, countrName]);

  const handleChange = (e) => {
    const countryNameValue = e.target.value.trim();
    setCountryName(countryNameValue);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInputStatus(true);
  }

  const handleOnSearchInputBlur = (e) => {
    setCountryName('');
    setSearchInputStatus(false);
  }

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
          <form>
            { searchInputStatus &&
              <input 
                type="text"
                name="countryName"
                value={countrName}
                id="countryName"
                onChange={ handleChange }
                onBlur={handleOnSearchInputBlur}
                placeholder="search country..."
              />
            }
            <button type="button" value="" onClick={handleSearch} >
              <FaSearch />
            </button>
          </form>
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
          filteredCountries.map(
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
