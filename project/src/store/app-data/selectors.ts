//import { createSelector } from 'reselect';
import {NameSpace} from '../../consts';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import {State} from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getPromo = (state: State): Promo | null => state[NameSpace.Data].promo;

