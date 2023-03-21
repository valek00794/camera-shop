import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import ReviewAdd from './review-add';

const mockStore = configureMockStore([thunk]);

const fakeReview = makeFakeReview(1);

const store = mockStore({
  DATA: { review: fakeReview },
});

describe('Component: ReviewAdd', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useState(true));
    const activeReviewAddState = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewAdd activeReviewAddState={activeReviewAddState} activeReviewAddSuccessState={activeReviewAddState} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });

  it('2. should click button Add review correctly', async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useState(true));
    const activeReviewAddState = result.current;
    const fakeHandleAddReview = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewAdd activeReviewAddState={activeReviewAddState} activeReviewAddSuccessState={activeReviewAddState} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    screen.getByText(/Оставить отзыв/i).onclick = fakeHandleAddReview;
    await userEvent.click(screen.getByText(/Оставить отзыв/i));
    expect(fakeHandleAddReview).toBeCalledTimes(1);
  });
  it('3. should click on button to close modal correctly', async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useState(true));
    const activeReviewAddState = result.current;
    const fakeHandleCloseModal = jest.fn();
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewAdd activeReviewAddState={activeReviewAddState} activeReviewAddSuccessState={activeReviewAddState} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByTestId('btn-close-modal')).toBeInTheDocument();
    screen.getByTestId('btn-close-modal').onclick = fakeHandleCloseModal;
    await userEvent.click(screen.getByTestId('btn-close-modal'));
    expect(fakeHandleCloseModal).toBeCalledTimes(1);
  });
});
