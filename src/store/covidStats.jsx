import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCovidStats = createAsyncThunk(
  'covidStats/fetchStats',
  async (param, thunkApi) => {
    const { dispatch } = thunkApi;
    const { data } = await axios.get(`https://api.covid19tracking.narrativa.com/api/${param.date}`);
    const casesByCountry = data.dates['2022-03-05'].countries;
    const totalCases = data.total;
    console.log(casesByCountry);
    dispatch({
      type: 'covidStats/statsFetched',
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

const slice = createSlice({
  name: 'covidStats',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    statsFetched: (state, action) => {
      state.casesByCountry = action.payload.casesByCountry;
      state.totalCases = action.payload.totalCases;
    },
  },
});

export const { statsFetched } = slice.actions;
export default slice.reducer;
