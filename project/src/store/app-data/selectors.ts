import { createSelector } from 'reselect';
import { CAMERAS_AMOUNT_SHOW_BY_PAGE, NameSpace } from '../../consts';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasIds = (state: State): string[] => state[NameSpace.Data].cameras.map((el) => el.id.toString());
export const getCamerasDataLoading = (state: State): boolean => state[NameSpace.Data].isCamerasDataLoading;
export const getCamerasAmount = (state: State): number => state[NameSpace.Data].cameras.length;
export const getPromo = (state: State): Promo | null => state[NameSpace.Data].promo;
export const getPromoDataLoading = (state: State): boolean => state[NameSpace.Data].isPromoDataLoading;
export const getCameraInfo = (state: State): Camera | null => state[NameSpace.Data].cameraInfo;
export const getCameraInfoDataLoading = (state: State): boolean => state[NameSpace.Data].isCameraInfoDataLoading;
export const getCameraReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Data].similarCameras;
export const getReviewSubmitSuccessful = (state: State): boolean => state[NameSpace.Data].isReviewSubmitSuccessful;

export const getCamerasByPage = (currentPage: number) => createSelector(
  getCameras,
  (cameras) =>
    cameras.slice(CAMERAS_AMOUNT_SHOW_BY_PAGE * currentPage - CAMERAS_AMOUNT_SHOW_BY_PAGE, CAMERAS_AMOUNT_SHOW_BY_PAGE * currentPage));

export const getSortCameraReviews = () => createSelector(
  getCameraReviews,
  (reviews) =>
    reviews.slice().sort((reviewA, reviewB) => Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt)));


