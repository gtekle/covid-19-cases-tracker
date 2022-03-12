import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import store from '../store/configureStore';
import RegionsList from '../components/RegionsList';

describe('Regions list', () => {
  const country = {
    id: 'albania',
    name: 'Albania',
    today_confirmed: 450000,
    regions: [
      {
        id: 'region_one',
        name: 'region-one',
        today_confirmed: 450000,
      },
    ],
  };

  it('RegionsList component renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <RegionsList country={country} />
        </Router>
      </Provider>,
    );
    const countryName = getByText('Albania');
    expect(countryName).toBeInTheDocument();
  });
});
