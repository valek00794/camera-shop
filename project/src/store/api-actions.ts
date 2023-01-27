import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {APIRoute} from '../consts';

import {AppDispatch, State} from '../types/state.js';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/review';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchCameraInfoAction = createAsyncThunk<Camera, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameraInfo',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera>(id ? `${APIRoute.Cameras}/${id}` : '');
    return data;
  },
);

export const fetchCameraReviewsAction = createAsyncThunk<Review[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameraReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(id ? `${APIRoute.Cameras}/${id}${APIRoute.Reviews}` : '');
    return data;
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera[]>(id ? `${APIRoute.Cameras}/${id}${APIRoute.Similar}` : '');
    return data;
  },
);
