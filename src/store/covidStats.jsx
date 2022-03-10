import axios from 'axios';

const BASE_URL = 'https://api.covid19tracking.narrativa.com/api/';
const FETCH_SUCCESS = 'covidStats/covidStatsFetched';
const FETCH_FAIL = 'covidStats/covidStatsFetchFailed';

export const fetchCovidStats = (param) => async (dispatch) => {
  try {
    console.log(param.date);
    const { data } = await axios.get(`${BASE_URL}/${param.date}`);
    const casesByCountry = data.dates[param.date].countries;
    const totalCases = data.total;

    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        casesByCountry,
        totalCases,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_FAIL,
      payload: error,
    });
  }
};

const initialState = {
  casesByCountry: {},
  totalCases: {},
};

const covidStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        casesByCountry: action.payload.casesByCountry,
        totalCases: action.payload.totalCases,
      };
    case FETCH_FAIL:
      return state;
    default:
      return state;
  }
};

export default covidStatsReducer;
