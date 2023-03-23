import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';
import { makeFakeBasketCamera } from '../../utils/mocks';


const mockStore = configureMockStore([thunk]);

const fakeBasketItems = [{...makeFakeBasketCamera(1), count: 2}, {...makeFakeBasketCamera(2), count: 99}];

const store = mockStore({
  DATA: {basketItems: fakeBasketItems},
});

describe('Component: Header', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });
  it('2. should render correctly if bsket not empty', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
  });
});
