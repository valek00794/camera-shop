import {appData} from './app-data';
import {
  fakeCameraInfo,
  makeFakeCameras,
  makeFakePromo,
  makeFakeReviews,
  makeFakeReview,
} from '../../utils/mocks';

import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCameraInfoWithReviewsAction,
  fetchSimilarCamerasAction,
  fetchPostReviewAction,
} from '../api-actions';

const fakeCameras = makeFakeCameras(20);
const fakePromo = makeFakePromo();
const fakeReviews = makeFakeReviews(5);
const fakeSimilarCameras = makeFakeCameras(5);
const fakeNewReview = makeFakeReview(1);

const initialState = {
  cameras: [],
  isCamerasDataLoading: false,
  promo: null,
  isPromoDataLoading: false,
  cameraInfo: null,
  isCameraInfoDataLoading: false,
  reviews: [],
  similarCameras: [],
  isReviewSubmitSuccessful: false,
  isRequestFailed: false,
  foundCameras: [],
  priceRange: null,
  isPriceRangeDataLoading: false,
  isSearchDataLoading: false,
};


describe('Reducer: appData', () => {
  it('1. without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('2.1. should set isCamerasDataLoading when load cameras', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchCamerasAction.pending.type}))
      .toEqual({...state, isCamerasDataLoading: true});
  });

  it('2.2 should update cameras by load cameras and set isCamerasDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, cameras: fakeCameras, isCamerasDataLoading: false});
  });

  it('3.1. should set isCameraInfoDataLoading when load cameraInfo', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchCameraInfoWithReviewsAction.pending.type}))
      .toEqual({...state, isCameraInfoDataLoading: true});
  });

  it('3.2. should update cameraInfo and revievs by load cameraInfo _embed=reviews and set isCameraInfoDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchCameraInfoWithReviewsAction.fulfilled.type, payload: {...fakeCameraInfo, reviews: fakeReviews}}))
      .toEqual({...state, cameraInfo: fakeCameraInfo, isCameraInfoDataLoading: false, reviews: fakeReviews});
  });

  it('4.1. should set isPromoDataLoading when load promo', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchPromoAction.pending.type}))
      .toEqual({...state, isPromoDataLoading: true});
  });

  it('4.2. should update promo by load promo and set isPromoDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
      .toEqual({...state, promo: fakePromo, isPromoDataLoading: false});
  });

  it('5.1. should update similarCameras by load similarCameras', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeSimilarCameras}))
      .toEqual({...state, similarCameras: fakeSimilarCameras});
  });

  it('6.1. should update reviews before post review and set isReviewSubmitSuccessful', () => {
    const state = {...initialState, reviews: fakeReviews};
    const updateReviews = fakeReviews.slice();
    updateReviews.push(fakeNewReview);
    expect(appData.reducer(state, {type: fetchPostReviewAction.fulfilled.type, payload: fakeNewReview}))
      .toEqual({...state, reviews: updateReviews, isReviewSubmitSuccessful: true});
  });

  it('7.2. should set isReviewSubmitSuccessful flag if server is unavailable', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchPostReviewAction.rejected.type}))
      .toEqual({...state, isReviewSubmitSuccessful: false});
  });
});
