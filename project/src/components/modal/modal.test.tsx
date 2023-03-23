import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Modal from './modal';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: {},
});

describe('Component: Modal', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Modal isModalOpen onCloseModal={fakeOnCloseModal} >
            <h1>Fake children</h1>
          </Modal>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Fake children')).toBeInTheDocument();
  });
  it('2. should click on overlay correctly', async () => {
    let fakeIsModalOpen = true;
    const history = createMemoryHistory();
    const fakeHandleCloseModal = () => {
      fakeIsModalOpen = false;
    };
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Modal isModalOpen={fakeIsModalOpen} onCloseModal={fakeHandleCloseModal} >
            <h1>Fake children</h1>
          </Modal>
        </HistoryRouter>
      </Provider>

    );
    expect(fakeIsModalOpen).toBeTruthy();
    expect(screen.getByText('Fake children')).toBeInTheDocument();
    expect(screen.getByTestId('close-overlay')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('close-overlay'));
    expect(fakeIsModalOpen).toBeFalsy();
  });

  it('3. should click Esc correctly', async () => {
    const history = createMemoryHistory();
    const fakeOnCloseModal = jest.fn();
    const fakeHandleEsc = jest.fn();
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Modal isModalOpen onCloseModal={fakeOnCloseModal} >
            <h1>Fake children</h1>
          </Modal>
        </HistoryRouter>
      </Provider>
    );
    window.addEventListener('keyup', fakeHandleEsc);
    await userEvent.keyboard('[Enter]');
    expect(fakeHandleEsc).toHaveBeenCalledTimes(1);
  });
});
