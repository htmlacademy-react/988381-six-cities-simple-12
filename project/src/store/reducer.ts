import {createReducer} from '@reduxjs/toolkit';
import {LOCATIONS, SortTypes} from '../const';
import {offers} from '../mocks/offers';
import {setLocation, sortOffers} from './action';

const initialState = {
  location: LOCATIONS[0],
  offers: offers,
  sortType: SortTypes.DEFAULT
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(setLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(sortOffers, (state, action) => {
      state.sortType = action.payload;

      switch (state.sortType) {
        case SortTypes.PRICE_TO_HIGH:
          state.offers = state.offers.sort((a, b) => a.price - b.price);
          break;
        case SortTypes.PRICE_TO_LOW:
          state.offers = state.offers.sort((a, b) => b.price - a.price);
          break;
        case SortTypes.RATING:
          state.offers = state.offers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.offers = offers;
      }
    });
});
