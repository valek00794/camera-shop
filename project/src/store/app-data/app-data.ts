import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {AppData} from '../../types/state';
import {
  fetchCamerasAction,
  fetchPromoAction,

} from '../api-actions';

export const initialState: AppData = {
  cameras: [],
  isCamerasDataLoading: false,
  promo: null,
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
      });
  }
});
