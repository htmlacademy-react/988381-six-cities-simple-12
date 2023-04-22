import {createAction} from '@reduxjs/toolkit';

export const setLocation = createAction<string>('location/setLocation');
export const sortOffers = createAction<string>('offers/updateOffers');

