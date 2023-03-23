import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { fakeCameraInfo } from '../../utils/mocks';
import BasketAddItemModal from './basket-add-item-modal';

const mockStore = configureMockStore([thunk]);

const fakeAddToBasketCamera = fakeCameraInfo;

const store = mockStore({
  DATA: {},
});

const getFakeState = () => {
  const { result } = renderHook(() => useState(false));
  return result.current;
};

describe('Component: BasketAddItemModal', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketAddItemModal addToBasketCamera={fakeAddToBasketCamera} activeAddItemState={getFakeState()} activeAddItemSuccessState={getFakeState()} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText(`${fakeAddToBasketCamera.category} ${fakeAddToBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
  it('2. should click close modal correctly', async () => {
    const history = createMemoryHistory();
    const fakeCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketAddItemModal addToBasketCamera={fakeAddToBasketCamera} activeAddItemState={getFakeState()} activeAddItemSuccessState={getFakeState()} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByLabelText('Закрыть попап')).toBeInTheDocument();
    screen.getByLabelText('Закрыть попап').onclick = fakeCloseModal;
    await userEvent.click(screen.getByLabelText('Закрыть попап'));
    expect(fakeCloseModal).toBeCalledTimes(1);
  });
  it('3. should click add to basket correctly', async () => {
    const history = createMemoryHistory();
    const fakeAddToBasket = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketAddItemModal addToBasketCamera={fakeAddToBasketCamera} activeAddItemState={getFakeState()} activeAddItemSuccessState={getFakeState()} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    screen.getByText('Добавить товар в корзину').onclick = fakeAddToBasket;
    await userEvent.click(screen.getByText('Добавить товар в корзину'));
    expect(fakeAddToBasket).toBeCalledTimes(1);
  });
});
