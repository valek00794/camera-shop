import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketAddItemSuccessModal from './basket-add-item-modal-success';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: {},
});

const getFakeState = () => {
  const { result } = renderHook(() => useState(false));
  return result.current;
};

describe('Component: BasketAddItemSuccessModal', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketAddItemSuccessModal setIsActiveAddItemSuccess={getFakeState()[1]} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });
  it('2. should click close modal correctly', async () => {
    const history = createMemoryHistory();
    const fakeCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketAddItemSuccessModal setIsActiveAddItemSuccess={getFakeState()[1]} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByLabelText('Закрыть попап')).toBeInTheDocument();
    screen.getByLabelText('Закрыть попап').onclick = fakeCloseModal;
    await userEvent.click(screen.getByLabelText('Закрыть попап'));
    expect(fakeCloseModal).toBeCalledTimes(1);
  });
  it('3. should navigate to /catalog after click Continue shopping correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/catalog'
              element={<h1>This is catalog page</h1>}
            />
          </Routes>
          <BasketAddItemSuccessModal setIsActiveAddItemSuccess={getFakeState()[1]} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Продолжить покупки'));
    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();
  });
  it('4. should navigate to /basket after click Go to basket correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/catalog/basket'
              element={<h1>This is basket page</h1>}
            />
          </Routes>
          <BasketAddItemSuccessModal setIsActiveAddItemSuccess={getFakeState()[1]} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Перейти в корзину'));
    expect(screen.getByText(/This is basket page/i)).toBeInTheDocument();
  });
});
