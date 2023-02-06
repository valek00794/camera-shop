import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import { createMemoryHistory } from 'history';
import { makeFakeReviews } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import ReviewsList from './reviews-list';
import { ReviewListSetttings } from '../../consts';
import { useState } from 'react';


const mockStore = configureMockStore([thunk]);

const fakeReviews = makeFakeReviews(4);

const getFakeVisibleReviewsCountState = () => {
  const { result } = renderHook(() => useState(ReviewListSetttings.VisibleCount));
  return result.current;
};

const getFakeActiveReviewAddState = () => {
  const { result } = renderHook(() => useState(false));
  return result.current;
};

describe('Component: ReviewsList', () => {
  it('1. should render correctly if reviews is empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: { reviews: [] },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList visibleReviewsCountState={getFakeVisibleReviewsCountState()} activeReviewAddState={getFakeActiveReviewAddState()}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.queryByText('Показать больше отзывов')).not.toBeInTheDocument();
  });

  it('2. should click review add correctly', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: { reviews: [] },
    });

    const fakeHandleAddReview = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList visibleReviewsCountState={getFakeVisibleReviewsCountState()} activeReviewAddState={getFakeActiveReviewAddState()}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    screen.getByText('Оставить свой отзыв').onclick = fakeHandleAddReview;
    await userEvent.click(screen.getByText('Оставить свой отзыв'));
    expect(fakeHandleAddReview).toBeCalledTimes(1);
  });

  it('3. should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: { reviews: fakeReviews },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList visibleReviewsCountState={getFakeVisibleReviewsCountState()} activeReviewAddState={getFakeActiveReviewAddState()}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });
  it('4. should click show more reviews correctly', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: { reviews: fakeReviews },
    });
    const fakeHandleShowMoreReviews = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList visibleReviewsCountState={getFakeVisibleReviewsCountState()} activeReviewAddState={getFakeActiveReviewAddState()}/>
        </HistoryRouter>
      </Provider>

    );

    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
    screen.getByText('Показать больше отзывов').onclick = fakeHandleShowMoreReviews;
    await userEvent.click(screen.getByText('Показать больше отзывов'));
    expect(fakeHandleShowMoreReviews).toBeCalledTimes(1);

  });

});
