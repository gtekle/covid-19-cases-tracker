import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';

function App() {
  const { casesByCountry } = useSelector((state) => state);
  return (
    <Routes>
      <Route path="/" element={<CountriesList />} />
      <Route path="/:country" element={<CountryDetails country={casesByCountry[0]} />} />
    </Routes>
  );
}

export default App;
