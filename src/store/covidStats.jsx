import axios from 'axios';

const BASE_URL = 'https://api.covid19tracking.narrativa.com/api/';
const FETCH_SUCCESS = 'covidStats/covidStatsFetched';
const FETCH_FAIL = 'covidStats/covidStatsFetchFailed';

export const fetchCovidStats = () => async (dispatch) => {
  try {
    const { data } = await axios.request({
      baseURL: BASE_URL,
      url: '/2022-03-09',
    });
    const casesByCountry = data.dates['2022-03-09'].countries;
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
