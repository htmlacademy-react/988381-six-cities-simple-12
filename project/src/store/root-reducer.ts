import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import {offerData} from './offer-data/offer-data';
import {reviewData} from './review-data/review-data';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offerData.reducer,
  [NameSpace.Review]: reviewData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
