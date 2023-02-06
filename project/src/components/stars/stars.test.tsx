import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Stars from './stars';


const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: { },
});

describe('Component: Stars', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const stars = [1,2,3,4,5];
    const testRaring = stars[Math.floor(Math.random() * stars.length)];
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Stars rating={testRaring}/>
        </HistoryRouter>
      </Provider>

    );
    stars.map((star) => expect(screen.getByTestId(`star-${star}`)).toBeInTheDocument());
  });
});
