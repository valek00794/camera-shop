import {store} from '../store/index';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type AppData = {
    cameras: Camera[];
    isCamerasDataLoading: boolean;
    promo: Promo | null;
    isPromoDataLoading: boolean;
    cameraInfo: Camera | null;
    isCameraInfoDataLoading: boolean;
    reviews?: Review[];
    similarCameras: Camera[];
    isReviewSubmitSuccessful: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
