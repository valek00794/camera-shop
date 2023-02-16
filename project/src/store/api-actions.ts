import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute, CAMERAS_AMOUNT_SHOW_BY_PAGE } from '../consts';

import { AppDispatch, State } from '../types/state.js';
import { Camera, CameraEmbedRevievs } from '../types/camera';
import { Promo } from '../types/promo';
import { Review, ReviewPost } from '../types/review';

export const fetchCamerasAction = createAsyncThunk<Camera[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (start, { extra: api }) => {
    const { data, headers } = await api.get<Camera[]>(`${APIRoute.Cameras}?_start=${start}&_limit=${CAMERAS_AMOUNT_SHOW_BY_PAGE}`);
    const respData = [...data];
    respData.length = Number(headers['x-total-count']);
    return respData;
  },
);

export const fetchSearchCamerasAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSearchCameras',
  async (searchString, { extra: api }) => {
    const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}?name_like=${searchString}`);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchCameraInfoWithReviewsAction = createAsyncThunk<CameraEmbedRevievs, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameraInfoWithReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<CameraEmbedRevievs>(id ? `${APIRoute.Cameras}${id}?_embed=reviews` : '');
    return data;
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, { extra: api }) => {
    const { data } = await api.get<Camera[]>(id ? `${APIRoute.Cameras}${id}${APIRoute.Similar}` : '');
    return data;
  },
);

export const fetchPostReviewAction = createAsyncThunk<Review, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ ...postData }, { extra: api }) => {

    const adapedPostData = {
      ...postData,
      rating: Number(postData.rating),
    };

    const { data } = await api.post<Review>(APIRoute.Reviews, { ...adapedPostData });
    return data;
  },
);
