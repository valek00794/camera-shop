import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AppData } from '../../types/state';
import { addToBasketAction, changeCountInBasketAction } from '../action';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCameraInfoWithReviewsAction,
  fetchSimilarCamerasAction,
  fetchPostReviewAction,
  fetchSearchCamerasAction,
  fetchCamerasPriceRangeAction,
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
      .addCase(addToBasketAction, (state, action) => {
        state.basketItems?.push(action.payload);
      })
      .addCase(changeCountInBasketAction, (state, action) => {
        const indexItem = state.basketItems?.findIndex((item) => action.payload.id === item.id);
        if (indexItem > -1) {
          state.basketItems?.splice(indexItem, 1, action.payload);
        }
      });
  }
});
