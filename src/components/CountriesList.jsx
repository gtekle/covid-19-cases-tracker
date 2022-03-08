import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCovidStats } from '../store/covidStats';

const CountriesList = () => {
  const dispatch = useDispatch();
  const { casesByCountry, totalCases } = useSelector((state) => state);
  useEffect(async () => {
    dispatch(fetchCovidStats({ date: '2022-03-05' }));
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
              <li key={country}>
                {country}
              </li>
            ),
          )
        }
      </ul>
    </div>
  );
};

export default CountriesList;
