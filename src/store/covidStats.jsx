import axios from 'axios';

const BASE_URL = 'https://api.covid19tracking.narrativa.com/api/';
const FETCH_SUCCESS = 'covidStats/covidStatsFetched';
const FILTER_BY_COUNTRY_NAME = 'covidStats/filteredByCountryName';
const FILTER_BY_PAGE_NUMBER = 'covidStats/filteredByPageNumber';
const CLEAER_COUNTRIES_PER_PAGE = 'covidStats/clearedCountriesPerPage';
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

export const filterCountriesByPageNumber = (payload) => ({
  type: FILTER_BY_PAGE_NUMBER,
  payload,
});

export const clearCountriesPerPage = () => ({
  type: CLEAER_COUNTRIES_PER_PAGE,
  payload: [],
})

const initialState = {
  casesByCountry: {},
  filteredCountries: [],
  countriesPerPage: [],
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
      return {
        ...state,
        filteredCountries: [ ...Object.keys(action.payload.casesByCountry).filter(
          (country) => country.toLowerCase().startsWith(action.payload.countryName.toLowerCase())
          )
        ],
      };
    case FILTER_BY_PAGE_NUMBER:
      const indexOfFirstElement = action.payload.pageNumber*action.payload.pageSize;
      return {
        ...state,
        countriesPerPage: [
          ...state.countriesPerPage,
          ...state.filteredCountries.slice(
            indexOfFirstElement,
            indexOfFirstElement + action.payload.pageSize
          ),
        ]
      };
    case CLEAER_COUNTRIES_PER_PAGE:
      return {
        ...state,
        countriesPerPage: action.payload
      }
    case FETCH_FAIL:
      return initialState;
    default:
      return state;
  }
};

export default covidStatsReducer;
