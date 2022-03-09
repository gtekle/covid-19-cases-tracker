import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const statsFetched = createAction('statsFetched');

export const fetchCovidStats = createAsyncThunk(
  'covidStats/fetchStats',
  async (param, thunkApi) => {
    const { dispatch } = thunkApi;
    const { data } = await axios.get(`https://api.covid19tracking.narrativa.com/api/${param.date}`);
    const casesByCountry = data.dates[param.date].countries;
    const totalCases = data.total;
    console.log(casesByCountry);
    dispatch({
      type: [statsFetched.type],
      payload: {
        casesByCountry,
        totalCases,
      },
    });
  },
);

const initialState = {
  casesByCountry: {},
  totalCases: {},
};

const statsReducer = createReducer(initialState, {
  /* eslint-disable no-param-reassign */
  [statsFetched.type]: (state, action) => {
    state.casesByCountry = action.payload.casesByCountry;
    state.totalCases = action.payload.totalCases;
  },
});

export default statsReducer;
