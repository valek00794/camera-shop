import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCameraInfoWithReviewsAction,
  fetchSimilarCamerasAction,
  fetchPostReviewAction,
  fetchSearchCamerasAction,
  fetchCamerasPriceRangeAction,
  fetchPostCouponAction,
  fetchPostOrderAction,
} from './api-actions';

import { State } from '../types/state';

import { APIRoute, CAMERAS_AMOUNT_SHOW_BY_PAGE, SortState } from '../consts';
import {
  fakeCameraInfo,
  makeFakeCameras,
  makeFakePromo,
  makeFakeReviews,
  makeFakeNewReview,
  makeFakeDiscount,
  makeFakeOrder,
} from '../utils/mocks';

const mockCameraInfo = fakeCameraInfo;
const mockCameras = makeFakeCameras(10);
const mockPromo = makeFakePromo();
const mockReviews = makeFakeReviews(10);
const mockSimilarCameras = makeFakeCameras(10);
const mockNewReview = makeFakeNewReview();
const mockDiscount = makeFakeDiscount();
const mockOrder = makeFakeOrder();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('1. should dispatch cameras when GET /cameras with start & limit', async () => {
    const start = 0;
    const headers = { 'x-total-count': '50' };
    const fakeUrlSearchParams = new URLSearchParams();
    mockAPI
      .onGet(`${APIRoute.Cameras}?_start=${start}&_limit=${CAMERAS_AMOUNT_SHOW_BY_PAGE}`)
      .reply(200, mockCameras, headers);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction([start, fakeUrlSearchParams]));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });
  it('2. should dispatch foundCameras when GET /cameras with name_like="string"', async () => {
    const searchString = 'Sony';
    const urls = [
      `${APIRoute.Cameras}?name_like=${searchString}`,
      `${APIRoute.Cameras}?category_like=${searchString}`,
    ];
    urls.map((url) => mockAPI
      .onGet(url)
      .reply(200, mockCameras));

    const store = mockStore();

    await store.dispatch(fetchSearchCamerasAction(searchString));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSearchCamerasAction.pending.type,
      fetchSearchCamerasAction.fulfilled.type
    ]);
  });

  it('3. should dispatch priceRange when GET /cameras with params', async () => {
    const startitem = 0;
    const countItems = 1;
    const fakePriceRange: number[] = [mockCameraInfo.price];

    const urls = [
      `${APIRoute.Cameras}?_start=${startitem}&_limit=${countItems}&_sort=${SortState.Price}&_order=${SortState.Asc}`,
      `${APIRoute.Cameras}?_start=${startitem}&_limit=${countItems}&_sort=${SortState.Price}&_order=${SortState.Desc}`,
    ];
    urls.map((url) => mockAPI
      .onGet(url)
      .reply(200, fakePriceRange));

    const store = mockStore();

    await store.dispatch(fetchCamerasPriceRangeAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasPriceRangeAction.pending.type,
      fetchCamerasPriceRangeAction.fulfilled.type
    ]);
  });

  it('4. should dispatch cameraInfo when GET /cameras/:id?_embed=reviews', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}${String(mockCameraInfo.id)}?_embed=reviews`)
      .reply(200, { ...mockCameraInfo, reviews: mockReviews });

    const store = mockStore();

    await store.dispatch(fetchCameraInfoWithReviewsAction(String(mockCameraInfo.id)));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCameraInfoWithReviewsAction.pending.type,
      fetchCameraInfoWithReviewsAction.fulfilled.type
    ]);
  });

  it('5. should dispatch promo when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('6. should dispatch similarCameras when GET /cameras/id/similar', async () => {

    mockAPI
      .onGet(APIRoute.Cameras + String(mockCameraInfo.id) + APIRoute.Similar)
      .reply(200, mockSimilarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(String(mockCameraInfo.id)));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });


  it('7. should dispatch favoriteOffers when POST /reviews/', async () => {
    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchPostReviewAction(mockNewReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPostReviewAction.pending.type,
      fetchPostReviewAction.fulfilled.type,
    ]);
  });

  it('8. should dispatch discount when POST /coupons', async () => {
    mockAPI
      .onPost(APIRoute.Coupons)
      .reply(200, mockDiscount);

    const store = mockStore();

    await store.dispatch(fetchPostCouponAction('CouponString'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPostCouponAction.pending.type,
      fetchPostCouponAction.fulfilled.type,
    ]);
  });

  it('9. should dispatch discount when POST /orders', async () => {
    mockAPI
      .onPost(APIRoute.Orders)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchPostOrderAction(mockOrder));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPostOrderAction.pending.type,
      fetchPostOrderAction.fulfilled.type,
    ]);
  });
});
