import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import FilterForm from './filter-form';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: {},
});

describe('Component: FilterForm', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useRef(false));
    const fakeRef = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm
            priceFromFieldFocusRef={fakeRef}
            priceToFieldFocusRef={fakeRef}
            serverPriceFrom={''}
            serverPriceTo={''}
          />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
  it('2. should render correctly with PriceRange in placeholders and check type in PriceRange values',async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useRef(false));
    const fakeRef = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm
            priceFromFieldFocusRef={fakeRef}
            priceToFieldFocusRef={fakeRef}
            serverPriceFrom={'1990'}
            serverPriceTo={'2000'}
          />
        </HistoryRouter>
      </Provider>

    );
    const inputPriceFrom = screen.getByPlaceholderText('1990');
    const inputPriceTo = screen.getByPlaceholderText('2000');
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(inputPriceFrom).toBeInTheDocument();
    expect(inputPriceTo).toBeInTheDocument();

    await userEvent.type(inputPriceFrom, '1994');
    expect(inputPriceFrom).toHaveDisplayValue('1994');

    await userEvent.type(inputPriceTo, '1999');
    expect(inputPriceTo).toHaveDisplayValue('1999');
  });

  it('2. should click checkbox Category and disable Types for Videocameras correctly', async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useRef(false));
    const fakeRef = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm
            priceFromFieldFocusRef={fakeRef}
            priceToFieldFocusRef={fakeRef}
            serverPriceFrom={''}
            serverPriceTo={''}
          />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Фильтр')).toBeInTheDocument();

    const checkBoxCategoryPhotoCamera = screen.getByLabelText('Фотокамера');
    const checkBoxCategoryVideoCamera = screen.getByLabelText('Видеокамера');
    const checkBoxTypeFilm = screen.getByLabelText('Плёночная');
    const checkBoxTypeSnapshot = screen.getByLabelText('Моментальная');

    await userEvent.click(checkBoxCategoryPhotoCamera);
    expect(checkBoxCategoryPhotoCamera).toBeChecked();
    expect(checkBoxCategoryVideoCamera).not.toBeChecked();
    expect(checkBoxTypeFilm).toBeEnabled();
    expect(checkBoxTypeSnapshot).toBeEnabled();

    await userEvent.click(checkBoxCategoryVideoCamera);
    expect(checkBoxCategoryVideoCamera).toBeChecked();
    expect(checkBoxCategoryPhotoCamera).not.toBeChecked();
    expect(checkBoxTypeFilm).toBeDisabled();
    expect(checkBoxTypeSnapshot).toBeDisabled();
  });
  it('3. should click checkbox Types and disable Category Videocameras correctly', async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useRef(false));
    const fakeRef = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm
            priceFromFieldFocusRef={fakeRef}
            priceToFieldFocusRef={fakeRef}
            serverPriceFrom={''}
            serverPriceTo={''}
          />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Фильтр')).toBeInTheDocument();

    const checkBoxCategoryPhotoCamera = screen.getByLabelText('Фотокамера');
    const checkBoxCategoryVideoCamera = screen.getByLabelText('Видеокамера');
    const checkBoxTypeDigital = screen.getByLabelText('Цифровая');
    const checkBoxTypeSnapshot = screen.getByLabelText('Моментальная');
    const checkBoxTypeCollection = screen.getByLabelText('Коллекционная');

    await userEvent.click(checkBoxTypeDigital);
    expect(checkBoxTypeDigital).toBeChecked();

    await userEvent.click(checkBoxTypeSnapshot);
    expect(checkBoxTypeSnapshot).toBeChecked();
    expect(checkBoxCategoryPhotoCamera).toBeChecked();
    expect(checkBoxCategoryVideoCamera).toBeDisabled();

    await userEvent.click(checkBoxTypeCollection);
    expect(checkBoxTypeCollection).toBeChecked();
  });
  it('4. should click checkbox Levels correctly', async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useRef(false));
    const fakeRef = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm
            priceFromFieldFocusRef={fakeRef}
            priceToFieldFocusRef={fakeRef}
            serverPriceFrom={''}
            serverPriceTo={''}
          />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Фильтр')).toBeInTheDocument();

    const checkBoxLevelZero = screen.getByLabelText('Нулевой');
    const checkBoxLevelNonPro = screen.getByLabelText('Любительский');
    const checkBoxLevelPro = screen.getByLabelText('Профессиональный');

    await userEvent.click(checkBoxLevelZero);
    expect(checkBoxLevelZero).toBeChecked();

    await userEvent.click(checkBoxLevelNonPro);
    expect(checkBoxLevelNonPro).toBeChecked();

    await userEvent.click(checkBoxLevelPro);
    expect(checkBoxLevelPro).toBeChecked();

  });
  it('5. should click checkbox Category, Types, Levels, type in PriceRange input and resel all after ckick button Reset correctly', async () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useRef(false));
    const fakeRef = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm
            priceFromFieldFocusRef={fakeRef}
            priceToFieldFocusRef={fakeRef}
            serverPriceFrom={'5000'}
            serverPriceTo={'150000'}
          />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Фильтр')).toBeInTheDocument();

    const checkBoxCategoryPhotoCamera = screen.getByLabelText('Фотокамера');
    const checkBoxCategoryVideoCamera = screen.getByLabelText('Видеокамера');
    const checkBoxTypeDigital = screen.getByLabelText('Цифровая');
    const checkBoxTypeFilm = screen.getByLabelText('Плёночная');
    const checkBoxLevelZero = screen.getByLabelText('Нулевой');
    const checkBoxLevelNonPro = screen.getByLabelText('Любительский');
    const buttonReset = screen.getByTestId('reset');
    const inputPriceFrom = screen.getByPlaceholderText('5000');
    const inputPriceTo = screen.getByPlaceholderText('150000');

    await userEvent.click(checkBoxTypeDigital);
    expect(checkBoxTypeDigital).toBeChecked();

    await userEvent.click(checkBoxTypeFilm);
    expect(checkBoxTypeFilm).toBeChecked();
    expect(checkBoxCategoryPhotoCamera).toBeChecked();
    expect(checkBoxCategoryVideoCamera).toBeDisabled();


    await userEvent.click(checkBoxLevelZero);
    expect(checkBoxLevelZero).toBeChecked();

    await userEvent.click(checkBoxLevelNonPro);
    expect(checkBoxLevelNonPro).toBeChecked();

    expect(inputPriceFrom).toBeInTheDocument();
    expect(inputPriceTo).toBeInTheDocument();

    await userEvent.type(inputPriceFrom, '5001');
    expect(inputPriceFrom).toHaveDisplayValue('5001');

    await userEvent.type(inputPriceTo, '10000');
    expect(inputPriceTo).toHaveDisplayValue('10000');

    await userEvent.click(buttonReset);
    expect(checkBoxCategoryPhotoCamera).not.toBeChecked();
    expect(checkBoxCategoryVideoCamera).not.toBeDisabled();
    expect(checkBoxTypeDigital).not.toBeChecked();
    expect(checkBoxTypeFilm).not.toBeChecked();
    expect(checkBoxLevelZero).not.toBeChecked();
    expect(checkBoxLevelNonPro).not.toBeChecked();
    expect(inputPriceFrom).toHaveDisplayValue('');
    expect(inputPriceTo).toHaveDisplayValue('');
  });
});
