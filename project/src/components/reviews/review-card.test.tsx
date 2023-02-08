import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import ReviewCard from './review-card';


const mockStore = configureMockStore([thunk]);

const fakeReview = makeFakeReview(1);

const store = mockStore({
  DATA: { review: fakeReview },
});

describe('Component: ReviewCard', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewCard review={fakeReview}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.review)).toBeInTheDocument();
  });
});
