import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import BasketItemRemove from './basket-item-remove';
import { makeFakeBasketCamera } from '../../utils/mocks';


const mockStore = configureMockStore([thunk]);

const fakeBasketCamera = makeFakeBasketCamera(1);
const fakeBasketCameras = [fakeBasketCamera, makeFakeBasketCamera(2)];

const store = mockStore({
  DATA: {basketItem: fakeBasketCameras},
});

describe('Component: BasketItemRemove', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItemRemove onCloseModal={fakeOnCloseModal} item={fakeBasketCamera}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeBasketCamera.category} ${fakeBasketCamera.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
