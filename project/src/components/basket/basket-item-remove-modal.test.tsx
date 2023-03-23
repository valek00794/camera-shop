import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketItemRemoveModal from './basket-item-remove-modal';
import { makeFakeBasketCamera } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakeBasketCamera = makeFakeBasketCamera(1);

const store = mockStore({
  DATA: {},
});

describe('Component: BasketItemRemove', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItemRemoveModal onCloseModal={fakeOnCloseModal} item={fakeBasketCamera}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
  it('2. should button close modal correctly', async () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    const fakeCloseModal = jest.fn();
    const fakeDelete = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItemRemoveModal onCloseModal={fakeOnCloseModal} item={fakeBasketCamera}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByLabelText('Закрыть попап')).toBeInTheDocument();
    screen.getByLabelText('Закрыть попап').onclick = fakeCloseModal;
    await userEvent.click(screen.getByLabelText('Закрыть попап'));
    expect(fakeCloseModal).toBeCalledTimes(1);
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    screen.getByText('Продолжить покупки').onclick = fakeCloseModal;
    await userEvent.click(screen.getByText('Продолжить покупки'));
    expect(fakeCloseModal).toBeCalledTimes(2);
    expect(screen.getByText('Удалить')).toBeInTheDocument();
    screen.getByText('Удалить').onclick = fakeDelete;
    await userEvent.click(screen.getByText('Удалить'));
    expect(fakeDelete).toBeCalledTimes(1);
  });
});
