import { createSlice } from '@reduxjs/toolkit';

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
