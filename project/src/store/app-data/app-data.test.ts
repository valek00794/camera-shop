import { appData } from './app-data';
import {
  fakeCameraInfo,
  makeFakeCameras,
  makeFakePromo,
  makeFakeReviews,
  makeFakeReview,
  makeFakeBasketCamera,
  makeFakeDiscount,
  makeFakeCouponString,
} from '../../utils/mocks';

import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCameraInfoWithReviewsAction,
  fetchSimilarCamerasAction,
  fetchPostReviewAction,
  fetchSearchCamerasAction,
  fetchPostCouponAction,
  fetchPostOrderAction,
} from '../api-actions';
import { addToBasketOrIncCountAction, clearBasketAction, decCountItemBasketAction, removeFromBasketAction } from '../action';

const fakeCameras = makeFakeCameras(20);
const fakePromo = makeFakePromo();
const fakeReviews = makeFakeReviews(5);
const fakeSimilarCameras = makeFakeCameras(5);
const fakeNewReview = makeFakeReview(1);
const fakeBasketCamera = makeFakeBasketCamera(1);
const fakeBasketCameras = [fakeBasketCamera, makeFakeBasketCamera(2)];
const fakeDiscount = makeFakeDiscount();
const fakeCouponString = makeFakeCouponString();

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
  priceRange: [],
  isPriceRangeDataLoading: false,
  isSearchDataLoading: false,
  basketItems: [],
  discount: null,
  couponString: null,
  isCouponCheking: false,
  isValidCopupon: false,
  isOrderPostSuccessful: false,
};


describe('Reducer: appData', () => {
  it('1. without additional parameters should return initial state', () => {
    const state = initialState;
    expect(appData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('2.1. should set isCamerasDataLoading when load cameras', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchCamerasAction.pending.type }))
      .toEqual({ ...state, isCamerasDataLoading: true });
  });

  it('2.2 should update cameras by load cameras and set isCamerasDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: fakeCameras }))
      .toEqual({ ...state, cameras: fakeCameras, isCamerasDataLoading: false });
  });

  it('3.1. should set isCameraInfoDataLoading when load cameraInfo', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchCameraInfoWithReviewsAction.pending.type }))
      .toEqual({ ...state, isCameraInfoDataLoading: true });
  });

  it('3.2. should update cameraInfo and revievs by load cameraInfo _embed=reviews and set isCameraInfoDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchCameraInfoWithReviewsAction.fulfilled.type, payload: { ...fakeCameraInfo, reviews: fakeReviews } }))
      .toEqual({ ...state, cameraInfo: fakeCameraInfo, isCameraInfoDataLoading: false, reviews: fakeReviews });
  });

  it('4.1. should set isPromoDataLoading when load promo', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPromoAction.pending.type }))
      .toEqual({ ...state, isPromoDataLoading: true });
  });

  it('4.2. should update promo by load promo and set isPromoDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: fakePromo }))
      .toEqual({ ...state, promo: fakePromo, isPromoDataLoading: false });
  });

  it('5.1. should update similarCameras by load similarCameras', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeSimilarCameras }))
      .toEqual({ ...state, similarCameras: fakeSimilarCameras });
  });

  it('6.1. should update reviews before post review and set isReviewSubmitSuccessful', () => {
    const state = { ...initialState, reviews: fakeReviews };
    const updateReviews = fakeReviews.slice();
    updateReviews.push(fakeNewReview);
    expect(appData.reducer(state, { type: fetchPostReviewAction.fulfilled.type, payload: fakeNewReview }))
      .toEqual({ ...state, reviews: updateReviews, isReviewSubmitSuccessful: true });
  });

  it('7.2. should set isReviewSubmitSuccessful flag if server is unavailable', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPostReviewAction.rejected.type }))
      .toEqual({ ...state, isReviewSubmitSuccessful: false });
  });

  it('8.1. should set isSearchDataLoading when loading search result', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchSearchCamerasAction.pending.type }))
      .toEqual({ ...state, isSearchDataLoading: true });
  });

  it('8.2. should update foundCameras before get /cameras/name_like or caterory_like and set isSearchDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchSearchCamerasAction.fulfilled.type, payload: fakeCameras }))
      .toEqual({ ...state, isSearchDataLoading: false, foundCameras: fakeCameras });
  });

  it('9.1. should update basketItems before add to basket', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: addToBasketOrIncCountAction, payload: { camera: { ...fakeBasketCamera, count: 1 } }}))
      .toEqual({ ...state, basketItems: [{ ...fakeBasketCamera, count: 1 }] });
  });

  it('9.2. should update basketItems before inc count', () => {
    const state = { ...initialState, basketItems: [{ ...fakeBasketCamera, count: 1 }] };
    expect(appData.reducer(state, { type: addToBasketOrIncCountAction, payload: { camera: { ...fakeBasketCamera, count: 1 } }}))
      .toEqual({ ...state, basketItems: [{ ...fakeBasketCamera, count: 2 }] });
  });

  it('9.3. should update basketItems before set count', () => {
    const state = { ...initialState, basketItems: [{ ...fakeBasketCamera, count: 5 }] };
    expect(appData.reducer(state, { type: addToBasketOrIncCountAction, payload: { camera: { ...fakeBasketCamera }, count: 55 }}))
      .toEqual({ ...state, basketItems: [{ ...fakeBasketCamera, count: 55 }] });
  });

  it('10. should update basketItems before dec count', () => {
    const state = { ...initialState, basketItems: [{ ...fakeBasketCamera, count: 2 }] };
    expect(appData.reducer(state, { type: decCountItemBasketAction, payload: { ...fakeBasketCamera, count: 2 } }))
      .toEqual({ ...state, basketItems: [{ ...fakeBasketCamera, count: 1 }] });
  });

  it('11. should update basketItems before delete item', () => {
    const state = { ...initialState, basketItems: fakeBasketCameras };
    expect(appData.reducer(state, { type: removeFromBasketAction, payload: { ...fakeBasketCamera, id: 2 } }))
      .toEqual({ ...state, basketItems: [fakeBasketCamera] });
  });

  it('12.1. should set isValidCopupon, isCouponCheking  when post coupon', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPostCouponAction.pending.type }))
      .toEqual({ ...state, isValidCopupon: false, isCouponCheking: false });
  });

  it('12.2. should set isValidCopupon, isCouponCheking and update discount, couponString  when post coupon', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPostCouponAction.fulfilled.type, payload: fakeDiscount, meta: { arg: fakeCouponString } }))
      .toEqual({ ...state, discount: fakeDiscount, isCouponCheking: true, isValidCopupon: true, couponString: fakeCouponString });
  });
  it('12.3.  should set isValidCopupon, isCouponCheking flag and reset couponString if server is unavailable', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPostCouponAction.rejected.type }))
      .toEqual({ ...state, isCouponCheking: true, isValidCopupon: false, couponString: '' });
  });

  it('13.1. should set isOrderPostSuccessful when post order', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPostOrderAction.fulfilled.type }))
      .toEqual({ ...state, isOrderPostSuccessful: true });
  });
  it('13.2. should set isOrderPostSuccessful when post order rejected', () => {
    const state = initialState;
    expect(appData.reducer(state, { type: fetchPostOrderAction.rejected.type }))
      .toEqual({ ...state, isOrderPostSuccessful: false });
  });

  it('14. should set isOrderPostSuccessful, isCouponCheking, isValidCopupon and update basketItems, discount, couponString when post order successful', () => {
    const state = {
      ...initialState,
      basketItems: [{ ...fakeBasketCamera, count: 2 }],
      isOrderPostSuccessful: true,
      discount: fakeDiscount,
      couponString: fakeCouponString,
      isCouponCheking: true,
      isValidCopupon: true,
    };
    expect(appData.reducer(state, { type: clearBasketAction }))
      .toEqual({
        ...state,
        basketItems: [],
        isOrderPostSuccessful: false,
        discount: null,
        couponString: null,
        isCouponCheking: false,
        isValidCopupon: false,
      });
  });
});
