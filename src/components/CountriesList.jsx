import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCovidStats } from '../store/covidStats';
import Country from './Country';

const CountriesList = () => {
  const dispatch = useDispatch();
  const { casesByCountry, totalCases } = useSelector((state) => state);
  useEffect(async () => {
    if (Object.keys(casesByCountry).length === 0) dispatch(fetchCovidStats({ date: '2022-03-05' }));
  }, []);
  return (
    <div>
      <p>CountriesList</p>
      <p>
        Todate Confirmed Cases:
        {totalCases.today_confirmed}
      </p>
      <p>
        Todate Deaths:
        {totalCases.today_deaths}
      </p>
      <ul>
        {
          Object.keys(casesByCountry).map(
            (country) => (
              <Link key={country} to={country}>
                <Country country={casesByCountry[country]} />
              </Link>
            ),
          )
        }
      </ul>
    </div>
  );
};

export default CountriesList;
