import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft, FaSearch } from 'react-icons/fa';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';

import WORLD_MAP from '../assets/img/world-map.png';
import getCurrentDate from '../utils/currentDate';

import {
  fetchCovidStats,
  filterCountriesByName,
  filterCountriesByPageNumber,
  clearCountriesPerPage
} from '../store/covidStats';
import Country from './Country';
import DatePickerModal from './DatePickerModal';

const CountriesList = () => {
  const [countryName, setCountryName] = useState('');
  const [searchInputStatus, setSearchInputStatus] = useState(false);
  const [datePickerModalShow, setDatePickerModalShow] = React.useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 8;
  const currentDate = getCurrentDate();
  const dispatch = useDispatch();
  const observer = useRef();
  const { countryId } = useParams();
  const {
    casesByCountry,
    totalCases,
    filteredCountries,
    countriesPerPage 
  } = useSelector((state) => state);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  let alternatingBackgroundColor = 'default_color'; 
  
  useEffect(() => {
    if (casesByCountry.length === 0) dispatch(fetchCovidStats());
  }, []);
  
  useEffect(() => {
    if (casesByCountry) {
      dispatch(clearCountriesPerPage());
      dispatch(filterCountriesByName({countryName: countryName, casesByCountry}));
    }
    
    if (filteredCountries) dispatch(filterCountriesByPageNumber({pageNumber, pageSize}));

  }, [casesByCountry, countryName]);
  
  useEffect(() => {
    const totalPages = Math.floor(filteredCountries.length / pageSize);
    if (filteredCountries && pageNumber <= totalPages) {
      dispatch(filterCountriesByPageNumber({pageNumber, pageSize}));
    }
	}, [pageNumber]);
  
  const lastCountryElementRef = useCallback(countryNode => {
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver( (entries) => {
      if(entries[0].isIntersecting){
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    });
    
    if(countryNode) observer.current.observe(countryNode);
  }, [countriesPerPage]);
  
  const handleChange = (e) => {
    const countryNameValue = e.target.value.trim();
    dispatch(clearCountriesPerPage());
    setCountryName(countryNameValue);
    setPageNumber(0);
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
        { !searchInputStatus && <span>All Stats</span> }
        <div className="pick_date">
          { !searchInputStatus && 
            <button onClick={() => setDatePickerModalShow(true)}>
              <BsFillCalendarDateFill />
            </button>
          }
          <form>
            <DatePickerModal
              show={datePickerModalShow}
              onHide={() => setDatePickerModalShow(false)}
            />
            { searchInputStatus &&
              <input 
                type="text"
                name="countryName"
                value={countryName}
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
          <b>{totalCases.cases && totalCases.cases.toLocaleString('en-US')}</b>
          <br />
          Confirmed
        </span>
        <span>
          <b>{totalCases.deaths && totalCases.deaths.toLocaleString('en-US')}</b>
          <br />
          Deaths
        </span>
        <span>
          <b>{totalCases.recovered && totalCases.recovered.toLocaleString('en-US')}</b>
          <br />
          Recovered
        </span>
        <span>
          <b>{totalCases.active && totalCases.active.toLocaleString('en-US')}</b>
          <br />
          Open Cases
        </span>
      </div>
      <div className="stats_by_country_divider">
        <span>stats by country</span>
      </div>
      <ul className="countries_list">
        {
          countriesPerPage.map(
            (country, idx) => {
              if (isMobile) {
                if ((idx + 1) % 2 === 0) {
                  if (alternatingBackgroundColor === 'default_color') {
                    alternatingBackgroundColor = 'other_color';
                  } else {
                    alternatingBackgroundColor = 'default_color';
                  }
                }
              } else {
                if ((idx) % 4 === 0) {
                  if (alternatingBackgroundColor === 'default_color') {
                    alternatingBackgroundColor = 'default_color';
                  } else {
                    alternatingBackgroundColor = 'other_color';
                  }
                } else {
                  if (alternatingBackgroundColor === 'default_color') {
                    alternatingBackgroundColor = 'other_color';
                  } else {
                    alternatingBackgroundColor = 'default_color';
                  }
                }
              }
              return (
                countriesPerPage.length === idx + 1
                ? (
                    <Link ref={lastCountryElementRef} key={idx} data-testid={`${idx}-testId`} to={country.country} className={alternatingBackgroundColor}>
                      <Country country={casesByCountry[idx]} />
                    </Link>
                  ) 
                : (
                    <Link key={idx} data-testid={`${idx}-testId`} to={country.country} className={alternatingBackgroundColor}>
                      <Country country={casesByCountry[idx]} />
                    </Link>
                  )
              );
            },
          )
        }
      </ul>
    </div>
  );
};

export default CountriesList;
