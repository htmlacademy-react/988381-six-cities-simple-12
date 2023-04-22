import {createReducer} from '@reduxjs/toolkit';
import {LOCATIONS} from '../const';
import {offers} from '../mocks/offers';
import {setLocation, updateOffers} from './action';

const initialState = {
  location: LOCATIONS[0],
  offers: offers
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(setLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    });
});
