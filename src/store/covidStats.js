import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCovidStats = createAsyncThunk(
  'covidStats/fetchStats',
  async (param, thunkApi) => {
    const { dispatch } = thunkApi;
    const { data } = await axios.get(`https://api.covid19tracking.narrativa.com/api/${param.date}`);
    console.log(data);
    console.log(dispatch);
    console.log('date param: ', param.date);
  },
);

const slice = createSlice({
  name: 'covidStats',
  initialState: { casesByCountry: {}, totalCases: {} },
  reducers: {
    statsFetched: (state, action) => {
      console.log('statsFetched', state, action);
    },
  },
});

export const { statsFetched } = slice.actions;
export default slice.reducer;
