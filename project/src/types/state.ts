import {store} from '../store/index';
import { Camera } from './camera';
import { Promo } from './promo';

export type AppData = {
    cameras: Camera[];
    isCamerasDataLoading: boolean;
    promo: Promo | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
