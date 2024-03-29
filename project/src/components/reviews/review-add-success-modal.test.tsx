import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ReviewAddSuccess from './review-add-success-modal';


const mockStore = configureMockStore([thunk]);

const fakeReview = makeFakeReview(1);

const store = mockStore({
  DATA: { review: fakeReview },
});

const { result } = renderHook(() => useState(true));
const activeReviewAddSuccessState = result.current;

describe('Component: ReviewAddSuccessModal', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewAddSuccess activeReviewAddSuccessState={activeReviewAddSuccessState}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });

  it('2. should click button Back to shopping correctly', async () => {
    const history = createMemoryHistory();
    const fakeHandleBackToShoping = jest.fn();
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewAddSuccess activeReviewAddSuccessState={activeReviewAddSuccessState}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
    screen.getByText(/Вернуться к покупкам/i).onclick = fakeHandleBackToShoping;
    await userEvent.click(screen.getByText(/Вернуться к покупкам/i));
    expect(fakeHandleBackToShoping).toBeCalledTimes(1);
  });
});
