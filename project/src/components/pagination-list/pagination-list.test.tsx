import { datatype } from 'faker';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import PaginationList from './pagination-list';
import { makeFakeCameras } from '../../utils/mocks';
import { CAMERAS_AMOUNT_SHOW_BY_PAGE } from '../../consts';

const mockStore = configureMockStore([thunk]);
const fakeCameras = makeFakeCameras(datatype.number({min: 10, max: 200}));

const store = mockStore({
  DATA: { cameras: fakeCameras },
});

describe('Component: PaginationList', () => {
  it('1. should render correctly if param :page = fist page', () => {
    const history = createMemoryHistory();
    const pageCount = Math.ceil(fakeCameras.length / CAMERAS_AMOUNT_SHOW_BY_PAGE);
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
    const testLink = '/catalog/page_1';
    history.push(testLink);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/catalog/page_:page" element={<PaginationList pages={pages} pageCount={pageCount} />} />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    pages.map((page) => expect(screen.getByText(`${page}`)).toBeInTheDocument());
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
  it('2. should render correctly if param :page = random page from 2 to penultimate page', () => {
    const history = createMemoryHistory();
    const pageCount = Math.ceil(fakeCameras.length / CAMERAS_AMOUNT_SHOW_BY_PAGE);
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
    const randomCurrentPage = datatype.number({ min: pages[1], max: pages[pages.length - 2]});
    const testLink = `/catalog/page_${randomCurrentPage}`;
    history.push(testLink);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/catalog/page_:page" element={<PaginationList pages={pages} pageCount={pageCount} />} />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    pages.map((page) => expect(screen.getByText(`${page}`)).toBeInTheDocument());
    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
  it('3. should render correctly if param :page = last page', () => {
    const history = createMemoryHistory();
    const pageCount = Math.ceil(fakeCameras.length / CAMERAS_AMOUNT_SHOW_BY_PAGE);
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
    const testLink = `/catalog/page_${pages[pages.length - 1]}`;
    history.push(testLink);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/catalog/page_:page" element={<PaginationList pages={pages} pageCount={pageCount} />} />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    pages.map((page) => expect(screen.getByText(`${page}`)).toBeInTheDocument());
    expect(screen.getByText('Назад')).toBeInTheDocument();
  });
});
