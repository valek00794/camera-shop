import { createSelector } from 'reselect';
import {CAMERAS_AMOUNT_SHOW_BY_PAGE, NameSpace} from '../../consts';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import {State} from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasAmount = (state: State): number => state[NameSpace.Data].cameras.length;
export const getPromo = (state: State): Promo | null => state[NameSpace.Data].promo;

export const getCamerasByPage = (currentPage: number) => createSelector(
  getCameras,
  (cameras) =>
    cameras.slice(CAMERAS_AMOUNT_SHOW_BY_PAGE * currentPage - CAMERAS_AMOUNT_SHOW_BY_PAGE, CAMERAS_AMOUNT_SHOW_BY_PAGE * currentPage));

