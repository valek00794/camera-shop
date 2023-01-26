import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import {appData} from './app-data/app-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
});
