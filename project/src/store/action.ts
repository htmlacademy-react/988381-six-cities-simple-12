import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const setLocation = createAction<string>('location/setLocation');
export const sortOffers = createAction<string>('offers/updateOffers');
export const loadOffers = createAction<Offers>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setOffersStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

