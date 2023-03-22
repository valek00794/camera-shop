import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AppData } from '../../types/state';
import { addToBasketOrIncCountAction, clearBasketAction, decCountItemBasketAction, removeFromBasketAction } from '../action';
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
} from '../api-actions';

export const initialState: AppData = {
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

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchCamerasPriceRangeAction.pending, (state) => {
        state.isPriceRangeDataLoading = true;
      })
      .addCase(fetchCamerasPriceRangeAction.fulfilled, (state, action) => {
        state.priceRange?.push(...action.payload);
        state.isPriceRangeDataLoading = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoDataLoading = false;
      })
      .addCase(fetchCameraInfoWithReviewsAction.pending, (state) => {
        state.isCameraInfoDataLoading = true;
        state.isRequestFailed = false;
      })
      .addCase(fetchCameraInfoWithReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload.reviews;
        delete action.payload.reviews;
        state.cameraInfo = action.payload;
        state.isCameraInfoDataLoading = false;
      })
      .addCase(fetchCameraInfoWithReviewsAction.rejected, (state) => {
        state.isCameraInfoDataLoading = false;
        state.isRequestFailed = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchPostReviewAction.fulfilled, (state, action) => {
        state.isReviewSubmitSuccessful = true;
        state.reviews?.push(action.payload);
      })
      .addCase(fetchPostReviewAction.rejected, (state) => {
        state.isReviewSubmitSuccessful = false;
      })
      .addCase(fetchSearchCamerasAction.pending, (state,) => {
        state.isSearchDataLoading = true;
        state.foundCameras = [];
      })
      .addCase(fetchSearchCamerasAction.fulfilled, (state, action) => {
        state.foundCameras = action.payload;
        state.isSearchDataLoading = false;
      })
      .addCase(addToBasketOrIncCountAction, (state, action) => {
        const indexItem = state.basketItems?.findIndex((item) => action.payload.camera.id === item.id);
        if (indexItem > -1) {
          if (action.payload.count) {
            state.basketItems?.splice(indexItem, 1, { ...action.payload.camera, count: action.payload.count });
          } else {
            const replacementItemCount = state.basketItems[indexItem].count;
            state.basketItems?.splice(indexItem, 1, { ...action.payload.camera, count: replacementItemCount + 1 });
          }
        } else {
          state.basketItems?.push({ ...action.payload.camera, count: 1 });
        }
      })
      .addCase(decCountItemBasketAction, (state, action) => {
        const indexItem = state.basketItems?.findIndex((item) => action.payload.id === item.id);
        if (indexItem > -1) {
          state.basketItems?.splice(indexItem, 1, { ...action.payload, count: action.payload.count - 1 });
        }
      })
      .addCase(removeFromBasketAction, (state, action) => {
        const indexItem = state.basketItems?.findIndex((item) => action.payload.id === item.id);
        if (indexItem > -1) {
          state.basketItems?.splice(indexItem, 1);
        }
      })
      .addCase(fetchPostCouponAction.pending, (state) => {
        state.isValidCopupon = false;
        state.isCouponCheking = false;
      })
      .addCase(fetchPostCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.isValidCopupon = true;
        state.isCouponCheking = true;
        state.couponString = action.meta.arg;
      })
      .addCase(fetchPostCouponAction.rejected, (state) => {
        state.isValidCopupon = false;
        state.isCouponCheking = true;
        state.couponString = '';
      })
      .addCase(fetchPostOrderAction.fulfilled, (state) => {
        state.isOrderPostSuccessful = true;
      })
      .addCase(fetchPostOrderAction.rejected, (state) => {
        state.isOrderPostSuccessful = false;
      })
      .addCase(clearBasketAction, (state) => {
        state.isOrderPostSuccessful = false;
        state.basketItems = [];
        state.discount = null;
        state.couponString = null;
        state.isCouponCheking = false;
        state.isValidCopupon = false;
      });
  }
});
