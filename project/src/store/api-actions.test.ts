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
} from './api-actions';

import { State } from '../types/state';

import { APIRoute, CAMERAS_AMOUNT_SHOW_BY_PAGE } from '../consts';
import {
  fakeCameraInfo,
  makeFakeCameras,
  makeFakePromo,
  makeFakeReviews,
  makeFakeNewReview,
} from '../utils/mocks';
import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';

const mockCameraInfo = fakeCameraInfo;
const mockCameras = makeFakeCameras(10);
const mockPromo = makeFakePromo();
const mockReviews = makeFakeReviews(10);
const mockSimilarCameras = makeFakeCameras(10);
const mockNewReview = makeFakeNewReview();

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
    const headers = {'x-total-count': '50'};
    const { result } = renderHook(() => useSearchParams());
    const fakeSortState = result.current[0];
    mockAPI
      .onGet(`${APIRoute.Cameras}?_start=${start}&_limit=${CAMERAS_AMOUNT_SHOW_BY_PAGE}`)
      .reply(200, mockCameras, headers);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction([start, fakeSortState]));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });

  it('2. should dispatch cameraInfo when GET /cameras/:id?_embed=reviews', async () => {
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

  it('3. should dispatch promo when GET /promo', async () => {
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

  it('4. should dispatch similarCameras when GET /cameras/id/similar', async () => {

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


  it('5. should dispatch favoriteOffers when POST /reviews/', async () => {
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
});
