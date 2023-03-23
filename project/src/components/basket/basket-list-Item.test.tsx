import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { makeFakeBasketCamera } from '../../utils/mocks';
import BasketListItem from './basket-list-Item';

const mockStore = configureMockStore([thunk]);

const fakeBasketCamera = {...makeFakeBasketCamera(1), count: 5};

const store = mockStore({
  DATA: {},
});

describe('Component: BasketListItem', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketListItem item={fakeBasketCamera}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toHaveValue(fakeBasketCamera.count);
  });
  it('2. should click inc, dec and type count correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketListItem item={fakeBasketCamera}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toHaveValue(fakeBasketCamera.count);
    await userEvent.click(screen.getByLabelText('уменьшить количество товара'));
    expect(screen.getByLabelText('количество товара')).toHaveValue(fakeBasketCamera.count - 1);
    await userEvent.click(screen.getByLabelText('увеличить количество товара'));
    expect(screen.getByLabelText('количество товара')).toHaveValue(fakeBasketCamera.count);
    await userEvent.type(screen.getByLabelText('количество товара'), '2');
    expect(screen.getByLabelText('количество товара')).toHaveValue(52);
  });
  it('3. should click button delete item correctly', async () => {
    const history = createMemoryHistory();
    const fakeDelFunction = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketListItem item={fakeBasketCamera}/>
        </HistoryRouter>
      </Provider>

    );

    expect(screen.getByLabelText('Удалить товар')).toBeInTheDocument();
    screen.getByLabelText('Удалить товар').onclick = fakeDelFunction;
    await userEvent.click(screen.getByLabelText('Удалить товар'));
    expect(fakeDelFunction).toBeCalledTimes(1);
  });
});
