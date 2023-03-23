import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { fakeCameraInfo, makeFakeCameras } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import SimilarList from './similar-list';
import { useRef, useState } from 'react';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();
const fakeSmilarCameras = makeFakeCameras(4);

const store = mockStore({
  DATA: { similarCameras: fakeSmilarCameras, basketItems: [] },
});

const [
  firstCameraName,
  secondCameraName,
  thirdCameraName,
  fourthCameraName
] =
  [
    `${fakeSmilarCameras[0].category} ${fakeSmilarCameras[0].name}`,
    `${fakeSmilarCameras[1].category} ${fakeSmilarCameras[1].name}`,
    `${fakeSmilarCameras[2].category} ${fakeSmilarCameras[2].name}`,
    `${fakeSmilarCameras[3].category} ${fakeSmilarCameras[3].name}`
  ];

const getFakeActiveAddItemState = () => {
  const { result } = renderHook(() => useState(false));
  return result.current;
};

const getFakeAddToBasketCameraState = () => {
  const { result } = renderHook(() => useRef(fakeCameraInfo));
  return result.current;
};

describe('Component: SimilarList', () => {
  it('1. should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarList
            addToBasketCamera={getFakeAddToBasketCameraState()}
            setIsActiveAddItem={getFakeActiveAddItemState()[1]}
          />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.getByText(`${firstCameraName}`)).toBeInTheDocument();
    expect(screen.getByText(`${secondCameraName}`)).toBeInTheDocument();
    expect(screen.getByText(`${thirdCameraName}`)).toBeInTheDocument();
  });

  it('2. should render correctly and button prev = disabled, next = enabled', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarList
            addToBasketCamera={getFakeAddToBasketCameraState()}
            setIsActiveAddItem={getFakeActiveAddItemState()[1]}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('handle-prev')).toBeInTheDocument();
    expect(screen.getByTestId('handle-next')).toBeInTheDocument();
    expect(screen.getByTestId('handle-prev')).toBeDisabled();
    expect(screen.getByTestId('handle-next')).toBeEnabled();
  });

  it('3. should render correctly, buttons click and buttonts disabled change', async () => {
    const fakeHandleNext = jest.fn();
    const fakeHandlePrev = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarList
            addToBasketCamera={getFakeAddToBasketCameraState()}
            setIsActiveAddItem={getFakeActiveAddItemState()[1]}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('handle-next')).toBeInTheDocument();
    expect(screen.getByTestId('handle-prev')).toBeInTheDocument();
    screen.getByTestId('handle-next').onclick = fakeHandleNext;
    screen.getByTestId('handle-prev').onclick = fakeHandlePrev;
    await userEvent.click(screen.getByTestId('handle-next'));
    expect(fakeHandleNext).toBeCalledTimes(1);
    expect(screen.getByTestId('handle-prev')).toBeEnabled();
    expect(screen.getByTestId('handle-next')).toBeDisabled();
    expect(screen.getByText(`${secondCameraName}`)).toBeInTheDocument();
    expect(screen.getByText(`${thirdCameraName}`)).toBeInTheDocument();
    expect(screen.getByText(`${fourthCameraName}`)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('handle-prev'));
    expect(fakeHandlePrev).toBeCalledTimes(1);
    expect(screen.getByTestId('handle-prev')).toBeDisabled();
    expect(screen.getByTestId('handle-next')).toBeEnabled();
    expect(screen.getByText(`${firstCameraName}`)).toBeInTheDocument();
    expect(screen.getByText(`${secondCameraName}`)).toBeInTheDocument();
    expect(screen.getByText(`${thirdCameraName}`)).toBeInTheDocument();
  });
});

