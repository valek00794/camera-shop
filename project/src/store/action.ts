import {createAction} from '@reduxjs/toolkit';

import { Camera } from '../types/camera';

export const addToBasketAction = createAction('ADD_TO_BASKET', (camera : Camera) => ({
  payload: camera,
}));

