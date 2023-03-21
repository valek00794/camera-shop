import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeBasketCamera } from '../../utils/mocks';
import BasketItem from './basket-Item';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore([thunk]);

const fakeBasketCamera = {...makeFakeBasketCamera(1), count: 66};

const store = mockStore({
  DATA: {basketItem: [fakeBasketCamera]},
});

describe('Component: BasketItem', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem item={fakeBasketCamera}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toHaveValue(fakeBasketCamera.count);
  });
  it('2. should render correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem item={fakeBasketCamera}/>
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
    //expect(screen.getByLabelText('количество товара')).toHaveValue('10');
  });
});
