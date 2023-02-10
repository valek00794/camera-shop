import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {AppData} from '../../types/state';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCameraInfoWithReviewsAction,
  fetchSimilarCamerasAction,
  fetchPostReviewAction,
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
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoDataLoading = false;
      })
      .addCase(fetchCameraInfoWithReviewsAction.pending, (state) => {
        state.isCameraInfoDataLoading = true;
      })
      .addCase(fetchCameraInfoWithReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload.reviews;
        delete action.payload.reviews;
        state.cameraInfo = action.payload;
        state.isCameraInfoDataLoading = false;
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
      });
  }
});
