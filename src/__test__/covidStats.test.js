import axios from 'axios';
import reducer, { fetchCovidStats } from '../store/covidStats.js';
import getCurrentDate from '../utils/currentDate';

jest.mock('axios');

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    casesByCountry: {},
    totalCases: {},
  });
});

it('Should returns not null totalCases and casesByCountry objects', async () => {
  const currentDate = getCurrentDate();
  axios.get.mockResolvedValue({
    payload: {
      casesByCountry: {
        Albania: {
          name: 'Albania',
          today_confirmed: 272479,
          regions: [],
        },
        Australia: {
          name: 'Albania',
          today_confirmed: 3500000,
          regions: [
            {
              id: 'region1',
              name: 'Region One',
            },
          ],
        },
      },
      totalCases: {
        today_confirmed: 450000000,
        today_deaths: 6000000,
      },
    },
  });

  const { totalCases, casesByCountry } = fetchCovidStats({ date: currentDate });
  expect(casesByCountry).not.toBeNull();
  expect(totalCases).not.toBeNull();
});
