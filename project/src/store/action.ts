import {createAction} from '@reduxjs/toolkit';

import { BasketCamera } from '../types/camera';

export const addToBasketOrIncCountAction = createAction('ADD_OR_INC_TO_BASKET', (camera : BasketCamera, count?: number) => ({
  payload: {camera, count},
}));

export const decCountItemBasketAction = createAction('DEC_FROM_BASKET', (camera : BasketCamera) => ({
  payload: camera,
}));

export const removeFromBasketAction = createAction('DEL_FROM_BASKET', (camera : BasketCamera) => ({
  payload: camera,
}));

export const clearBasketAction = createAction('CLEAR_BASKET');

export const clearCouponCheck = createAction('CLEAR_COUPON_CKECK');
