import axios from 'axios';

const BASE_URL = 'https://api.covid19tracking.narrativa.com/api/';
const FETCH_SUCCESS = 'covidStats/covidStatsFetched';
const FILTER_BY_COUNTRY_NAME = 'covidStats/filteredByCountryName';
const FETCH_FAIL = 'covidStats/covidStatsFetchFailed';

export const fetchCovidStats = (param) => async (dispatch) => {
  let res;
  try {
    const { data } = await axios.get(`${BASE_URL}/${param.date}`);
    res = data;
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
    res = error;
    dispatch({
      type: FETCH_FAIL,
      payload: error,
    });
  }

  return res;
};

export const filterCountriesByName = (payload) => ({
  type: FILTER_BY_COUNTRY_NAME,
  payload,
});

const initialState = {
  casesByCountry: {},
  filteredCountries: [],
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
    case FILTER_BY_COUNTRY_NAME:
      console.log(action.payload.casesByCountry);
      return {
        ...state,
        filteredCountries: [ ...Object.keys(action.payload.casesByCountry).filter(
          (country) => country.toLowerCase().includes(action.payload.countryName.toLowerCase())
          )
        ],
      };
    case FETCH_FAIL:
      return initialState;
    default:
      return state;
  }
};

export default covidStatsReducer;
