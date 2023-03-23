import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { fakeCameraInfo, makeFakeBasketCamera } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ProductCard from './product-card';
import { useRef, useState } from 'react';

const mockStore = configureMockStore([thunk]);

const fakeBasketItem = makeFakeBasketCamera(1);

const store = mockStore({
  DATA: { basketItems: [] },
});

const getFakeActiveAddItemState = () => {
  const { result } = renderHook(() => useState(false));
  return result.current;
};
const getFakeAddToBasketCameraState = () => {
  const { result } = renderHook(() => useRef(fakeCameraInfo));
  return result.current;
};

describe('Component: ProductCard', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo} setIsActiveAddItem={getFakeActiveAddItemState()[1]} addToBasketCamera={getFakeAddToBasketCameraState()} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${fakeCameraInfo.name}`);
    expect(screen.getByText(`${fakeCameraInfo.category} ${fakeCameraInfo.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCameraInfo.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${fakeCameraInfo.rating}`)).toBeInTheDocument();

  });

  it('2. should click more info correctly', async () => {
    const history = createMemoryHistory();
    const fakeHandleMoreInfo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo} setIsActiveAddItem={getFakeActiveAddItemState()[1]} addToBasketCamera={getFakeAddToBasketCameraState()} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    screen.getByText('Подробнее').onclick = fakeHandleMoreInfo;
    await userEvent.click(screen.getByText('Подробнее'));
    expect(fakeHandleMoreInfo).toBeCalledTimes(1);
  });

  it('3. should render correctly then click button more info', async () => {
    const history = createMemoryHistory();
    const fakeHandleMoreInfo = jest.fn();
    const fakeLink = `/catalog/${fakeCameraInfo.id}/description`;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo} setIsActiveAddItem={getFakeActiveAddItemState()[1]} addToBasketCamera={getFakeAddToBasketCameraState()} />
          <Routes>
            <Route
              path={fakeLink}
              element={<h1>This is camera info page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    screen.getByText('Подробнее').onclick = fakeHandleMoreInfo;
    await userEvent.click(screen.getByText('Подробнее'));
    expect(screen.getByText(/This is camera info page/i)).toBeInTheDocument();
  });
  it('4. should click buy correctly', async () => {
    const history = createMemoryHistory();
    const fakeHandleBuy = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo} setIsActiveAddItem={getFakeActiveAddItemState()[1]} addToBasketCamera={getFakeAddToBasketCameraState()} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Купить')).toBeInTheDocument();
    screen.getByText('Купить').onclick = fakeHandleBuy;
    await userEvent.click(screen.getByText('Купить'));
    expect(fakeHandleBuy).toBeCalledTimes(1);
  });
  it('5. should click render correctly if basket includes item and navigate to basket', async () => {
    const history = createMemoryHistory();
    const storeBasketIncludes = mockStore({
      DATA: { basketItems: [{ ...fakeBasketItem, count: 1 }] },
    });
    render(
      <Provider store={storeBasketIncludes}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/catalog/basket'}
              element={<h1>This is basket page</h1>}
            />
          </Routes>
          <ProductCard camera={fakeCameraInfo} setIsActiveAddItem={getFakeActiveAddItemState()[1]} addToBasketCamera={getFakeAddToBasketCameraState()} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('В корзине')).toBeInTheDocument();
    await userEvent.click(screen.getByText('В корзине'));
    expect(screen.getByText(/This is basket page/i)).toBeInTheDocument();
  });
});
