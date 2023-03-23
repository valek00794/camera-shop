import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import HistoryRouter from '../../components/history-route/history-route';
import Basket from './basket';
import { makeFakeBasketCamera, makeFakeCouponString, makeFakeDiscount } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

window.scrollTo = jest.fn();

const fakeBasketCamera = {...makeFakeBasketCamera(1), count: 5};
const fakeBasketCamera2 = {...makeFakeBasketCamera(2), count: 3};
const fakeDiscount = makeFakeDiscount();
const fakeCoupon = makeFakeCouponString();

describe('Component: Basket', () => {

  it('1. should render correctly if basketItems empty', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        basketItems: [],
      },
    });

    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route
                path={'/catalog'}
                element={<h1>This is catalog page</h1>}
              />
            </Routes>
            <Basket />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(/Ваша корзина пуста, перейдите в каталог чтобы начать покупки/i)).toBeInTheDocument();
    expect(screen.getByText('В каталог')).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeDisabled();
    await userEvent.click(screen.getByText('В каталог'));
    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();
  });

  it('2. should render correctly when basket have 1 item with count = 5 and Sum, Total sum value correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        basketItems: [fakeBasketCamera],
      },
    });
    const mockSum = `${(fakeBasketCamera.count * fakeBasketCamera.price).toLocaleString()} ₽`;

    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Basket />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeEnabled();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeEnabled();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeEnabled();
    expect(screen.getByTestId('basket-sum')).toBeInTheDocument();
    expect(screen.getByTestId('basket-sum').textContent).toBe(mockSum);
    expect(screen.getByTestId('basket-discount')).toBeInTheDocument();
    expect(screen.getByTestId('basket-discount').textContent).toBe('0 ₽');
    expect(screen.getByTestId('basket-total')).toBeInTheDocument();
    expect(screen.getByTestId('basket-total').textContent).toBe(mockSum);
  });
  it('3. should render correctly when basket have 2 item and Sum, Total sum value correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        basketItems: [fakeBasketCamera, fakeBasketCamera2],
        discount: null,
        isValidCopupon: false,
      },
    });
    const mockSum = `${(fakeBasketCamera.count * fakeBasketCamera.price + fakeBasketCamera2.count * fakeBasketCamera2.price).toLocaleString()} ₽`;

    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Basket />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeBasketCamera2.category} ${fakeBasketCamera2.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeEnabled();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeEnabled();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeEnabled();
    expect(screen.getByTestId('basket-sum')).toBeInTheDocument();
    expect(screen.getByTestId('basket-sum').textContent).toBe(mockSum);
    expect(screen.getByTestId('basket-discount')).toBeInTheDocument();
    expect(screen.getByTestId('basket-discount').textContent).toBe('0 ₽');
    expect(screen.getByTestId('basket-discount')).toHaveClass('basket__summary-value');
    expect(screen.getByTestId('basket-total')).toBeInTheDocument();
    expect(screen.getByTestId('basket-total').textContent).toBe(mockSum);
  });
  it('4. should render correctly when basket have 2 item and Sum, Discount sum, Total sum value and coupon correct', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        basketItems: [fakeBasketCamera, fakeBasketCamera2],
        discount: fakeDiscount,
        isValidCopupon: true,
        isCouponCheking: true,
      },
    });
    const mockSum = fakeBasketCamera.count * fakeBasketCamera.price + fakeBasketCamera2.count * fakeBasketCamera2.price;
    const mockDicount = mockSum * fakeDiscount / 100;
    const mockTotal = mockSum - mockDicount;
    const handleOakeOrderPost = jest.fn();
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Basket />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeBasketCamera2.category} ${fakeBasketCamera2.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeEnabled();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeEnabled();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeEnabled();
    await userEvent.type(screen.getByPlaceholderText(/Введите промокод/i), fakeCoupon);
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toHaveValue(fakeCoupon);
    await userEvent.click(screen.getByText('Применить'));
    expect(screen.getByText('Промокод принят!')).toBeInTheDocument();
    expect(screen.getByTestId('basket-sum')).toBeInTheDocument();
    expect(screen.getByTestId('basket-sum').textContent).toBe(`${mockSum.toLocaleString()} ₽`);
    expect(screen.getByTestId('basket-discount')).toBeInTheDocument();
    expect(screen.getByTestId('basket-discount')).toHaveClass('basket__summary-value basket__summary-value--bonus');
    expect(screen.getByTestId('basket-discount').textContent).toBe(`${mockDicount.toLocaleString()} ₽`);
    expect(screen.getByTestId('basket-total').textContent).toBe(`${mockTotal.toLocaleString()} ₽`);
    screen.getByText(/Оформить заказ/i).onclick = handleOakeOrderPost;
    await userEvent.click(screen.getByText(/Оформить заказ/i));
    expect(handleOakeOrderPost).toBeCalledTimes(1);
  });
  it('5. should render correctly when basket have 2 item and coupon not correct', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        basketItems: [fakeBasketCamera, fakeBasketCamera2],
        discount: null,
        isValidCopupon: false,
        isCouponCheking: true,
      },
    });
    const mockSum = fakeBasketCamera.count * fakeBasketCamera.price + fakeBasketCamera2.count * fakeBasketCamera2.price;
    const handleFakeOrderPost = jest.fn();
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Basket />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeBasketCamera2.category} ${fakeBasketCamera2.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeEnabled();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeEnabled();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeEnabled();
    await userEvent.type(screen.getByPlaceholderText(/Введите промокод/i), fakeCoupon);
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toHaveValue(fakeCoupon);
    await userEvent.click(screen.getByText('Применить'));
    expect(screen.getByText('Промокод неверный')).toBeInTheDocument();
    expect(screen.getByTestId('basket-sum')).toBeInTheDocument();
    expect(screen.getByTestId('basket-sum').textContent).toBe(`${mockSum.toLocaleString()} ₽`);
    expect(screen.getByTestId('basket-discount')).toBeInTheDocument();
    expect(screen.getByTestId('basket-discount')).toHaveClass('basket__summary-value');
    expect(screen.getByTestId('basket-discount').textContent).toBe('0 ₽');
    expect(screen.getByTestId('basket-total').textContent).toBe(`${mockSum.toLocaleString()} ₽`);
    screen.getByText(/Оформить заказ/i).onclick = handleFakeOrderPost;
    await userEvent.click(screen.getByText(/Оформить заказ/i));
    expect(handleFakeOrderPost).toBeCalledTimes(1);
  });
});
