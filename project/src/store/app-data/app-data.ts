import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {AppData} from '../../types/state';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCameraInfoAction,
  fetchCameraReviewsAction,
  fetchSimilarCamerasAction,
} from '../api-actions';

export const initialState: AppData = {
  cameras: [],
  isCamerasDataLoading: false,
  promo: null,
  camera: null,
  reviews: [],
  similarCameras: [],
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
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchCameraInfoAction.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(fetchCameraReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  }
});
