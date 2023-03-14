import { createSelector } from 'reselect';

import { NameSpace } from '../../consts';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasDataLoading = (state: State): boolean => state[NameSpace.Data].isCamerasDataLoading;
export const getCamerasPriceRange = (state: State): number[] | null => state[NameSpace.Data].priceRange;
export const getPriceRangeDataLoading = (state: State): boolean => state[NameSpace.Data].isPriceRangeDataLoading;
export const getCamerasAmount = (state: State): number => state[NameSpace.Data].cameras.length;
export const getPromo = (state: State): Promo | null => state[NameSpace.Data].promo;
export const getPromoDataLoading = (state: State): boolean => state[NameSpace.Data].isPromoDataLoading;
export const getCameraInfo = (state: State): Camera | null => state[NameSpace.Data].cameraInfo;
export const getCameraInfoDataLoading = (state: State): boolean => state[NameSpace.Data].isCameraInfoDataLoading;
export const getCameraReviews = (state: State): Review[] | undefined => state[NameSpace.Data].reviews;
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Data].similarCameras;
export const getReviewSubmitSuccessful = (state: State): boolean => state[NameSpace.Data].isReviewSubmitSuccessful;
export const getResponseStatus = (state: State): boolean => state[NameSpace.Data].isRequestFailed;
export const getFoundCameras = (state: State): Camera[] | null => state[NameSpace.Data].foundCameras;
export const getSearchDataLoading = (state: State): boolean => state[NameSpace.Data].isSearchDataLoading;
export const getBasketItems = (state: State): Camera[] => state[NameSpace.Data].basketItems;

export const getSortCameraReviews = () => createSelector(
  getCameraReviews,
  (reviews) =>
    reviews?.slice().sort((reviewA, reviewB) => Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt)));


