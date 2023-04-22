import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer';

export const setLocation = createAction<string>('location/setLocation');
export const updateOffers = createAction<Offers>('offers/updateOffers');

