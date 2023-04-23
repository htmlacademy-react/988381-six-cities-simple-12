import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, LOCATIONS, SortTypes} from '../const';
import {loadOffers, requireAuthorization, setLocation, sortOffers, setOffersStatus} from './action';
import {Offers} from '../types/offer';

type InitialState = {
  location : string;
  offers: Offers;
  sortType: string;
  authorizationStatus: AuthorizationStatus;
  isOfferDataLoading: boolean;
}

const initialState : InitialState = {
  location: LOCATIONS[0],
  offers: [],
  sortType: SortTypes.DEFAULT,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOfferDataLoading: false
};

export const reducer = createReducer(initialState, (builder) => {
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
          state.offers = state.offers.sort((a, b) => 0);
      }
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    });
});
