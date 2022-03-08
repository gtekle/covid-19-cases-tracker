import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCovidStats = createAsyncThunk(
  'covidStats/fetchStats',
  async (date = '2022-03-06', thunkApi) => {
    const { dispatch } = thunkApi;
    const { data } = await axios.get(`https://api.covid19tracking.narrativa.com/api/${date}`);
    console.log(data);
    console.log(dispatch);
    // const rockets = data.map((rocket) => (
    //   {
    //     id: rocket.id,
    //     rocketName: rocket.rocket_name,
    //     description: rocket.description,
    //     rocketImage: rocket.flickr_images[0],
    //   }
    // ));
    // dispatch({
    //   type: rocketsFetched.type,
    //   payload: rockets,
    // });
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
