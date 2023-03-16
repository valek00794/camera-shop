import {createAction} from '@reduxjs/toolkit';

import { BasketCamera } from '../types/camera';

export const addToBasketAction = createAction('ADD_TO_BASKET', (camera : BasketCamera) => ({
  payload: camera,
}));

export const changeCountInBasketAction = createAction('CHANGE_COUNT_BASKET', (camera : BasketCamera) => ({
  payload: camera,
}));

export const removeFromBasketAction = createAction('DEL_FROM_BASKET', (id : number) => ({
  payload: id,
}));


