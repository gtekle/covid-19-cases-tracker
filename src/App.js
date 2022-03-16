import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import RegionsList from './components/RegionsList';
import RegionDetails from './components/RegionDetails';

function App() {
  const { casesByCountry } = useSelector((state) => state);
  const regex = /[*]/i;
  return (
    <Routes>
      <Route path="/" element={<CountriesList />} />
      {
        Object.keys(casesByCountry).map(
          (country) => (
            <Route
              key={country}
              path={`/${country.replace(regex, '')}`}
              element={
                casesByCountry[country].regions.length === 0
                  ? <CountryDetails country={casesByCountry[country]} />
                  : <RegionsList country={casesByCountry[country]} />
              }
            />
          ),
        )
      }
      {
        Object.keys(casesByCountry).map(
          (country) => (
            casesByCountry[country].regions.map(
              (region) => (
                <Route
                  key={region.id}
                  path={`/${country}/${region.id}`}
                  element={<RegionDetails region={region} />}
                />
              ),
            )
          ),
        )
      }
    </Routes>
  );
}

export default App;
