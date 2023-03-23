import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketOrderSuccessModal from './basket-order-success-modal';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: {},
});

describe('Component: BasketOrderSuccessModal', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketOrderSuccessModal onCloseModal={fakeOnCloseModal} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('2. should click close modal correctly', async () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    const fakeCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketOrderSuccessModal onCloseModal={fakeOnCloseModal} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByLabelText('Закрыть попап')).toBeInTheDocument();
    screen.getByLabelText('Закрыть попап').onclick = fakeCloseModal;
    await userEvent.click(screen.getByLabelText('Закрыть попап'));
    expect(fakeCloseModal).toBeCalledTimes(1);
  });
  it('3. should render correctly', async () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/catalog'
              element={<h1>This is catalog page</h1>}
            />
          </Routes>
          <BasketOrderSuccessModal onCloseModal={fakeOnCloseModal} />
        </HistoryRouter>
      </Provider >

    );
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Вернуться к покупкам'));
    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();
  });
});
