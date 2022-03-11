import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import store from '../store/configureStore';
import CountriesList from '../components/CountriesList';

describe('Countries List', () => {
  it('CountriesList component renders correctly', () => {
    const tree = render(
      <Provider store={store}>
        <Router>
          <CountriesList />
        </Router>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('CountriesList component renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <CountriesList />
        </Router>
      </Provider>,
    );
    const txt = getByText('Recovered');
    expect(txt).toBeInTheDocument();
  });
});
