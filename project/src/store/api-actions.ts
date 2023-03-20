import axios, { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute, CAMERAS_AMOUNT_SHOW_BY_PAGE, FilterParams, SortParams, SortState } from '../consts';

import { AppDispatch, State } from '../types/state.js';
import { Camera, CameraEmbedRevievs } from '../types/camera';
import { Promo } from '../types/promo';
import { Review, ReviewPost } from '../types/review';
import { OrderPost } from '../types/order';

export const fetchCamerasAction = createAsyncThunk<Camera[], [number, URLSearchParams], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async ([start, searchParams], { extra: api }) => {
    const { data, headers } = await api.get<Camera[]>(`${APIRoute.Cameras}?_start=${start}&_limit=${CAMERAS_AMOUNT_SHOW_BY_PAGE}`, {
      params: {
        _sort: searchParams.get(SortParams.Sort),
        _order: searchParams.get(SortParams.Order),
        category: searchParams.get(FilterParams.Category),
        level: searchParams.getAll(FilterParams.Level),
        type: searchParams.getAll(FilterParams.Type),
        'price_gte': searchParams.getAll(FilterParams.PriceFrom),
        'price_lte': searchParams.getAll(FilterParams.PriceTo),
      }
    });
    const respData = [...data];
    respData.length = Number(headers['x-total-count']);
    return respData;
  },
);

export const fetchCamerasPriceRangeAction = createAsyncThunk<number[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasPriceRange',
  async (_arg, { extra: api }) => {
    const startitem = 0;
    const countItems = 1;
    const urls = [
      `${APIRoute.Cameras}?_start=${startitem}&_limit=${countItems}&_sort=${SortState.Price}&_order=${SortState.Asc}`,
      `${APIRoute.Cameras}?_start=${startitem}&_limit=${countItems}&_sort=${SortState.Price}&_order=${SortState.Desc}`,
    ];
    const requests = urls.map((url) => api.get<[Camera]>(url));
    const [resp1, resp2] = await axios.all(requests);
    return [resp1.data[0].price, resp2.data[0].price];
  },
);

export const fetchSearchCamerasAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSearchCameras',
  async (searchString, { extra: api }) => {
    const urls = [
      `${APIRoute.Cameras}?name_like=${searchString}`,
      `${APIRoute.Cameras}?category_like=${searchString}`,
    ];
    const requests = urls.map((url) => api.get<Camera[]>(url));
    const [resp1, resp2] = await axios.all(requests);
    return resp1.data.length !== 0 ? resp1.data : resp2.data;
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

export const fetchPostCouponAction = createAsyncThunk<number, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/applyCoupon',
  async (coupon, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Coupons, { coupon });
    return data;
  },
);

export const fetchPostOrderAction = createAsyncThunk<string, OrderPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postOrder',
  async (order, { extra: api }) => {
    const { data } = await api.post<string>(APIRoute.Orders, { ...order });
    return data;
  },
);
