import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';

import store from '../store/configureStore';
import Country from '../components/Country.jsx';

describe('Country', () => {
  const country = {
    id: 'albania',
    name: 'Albania',
    today_confirmed: 450000,
  }

  it('Country component renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Country country={country} />
        </Router>
      </Provider>
    );
    const countryName = getByText('Albania');
    expect(countryName).toBeInTheDocument();
  });
})
