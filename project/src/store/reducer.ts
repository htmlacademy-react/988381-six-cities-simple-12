import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, LOCATIONS, SortTypes} from '../const';
import {
  loadOffers,
  requireAuthorization,
  setLocation,
  sortOffers,
  setOffersStatus,
  loadReviews,
  setReview, loadOffer, loadNearbyOffers, setNearbyOffersStatus
} from './action';
import {Offer, Offers} from '../types/offer';
import {Review, Reviews} from '../types/review';

type InitialState = {
  location : string;
  offer: Offer | null;
  offers: Offers;
  nearbyOffers: Offers;
  review: Review | null;
  reviews: Reviews;
  sortType: string;
  authorizationStatus: AuthorizationStatus;
  isOfferDataLoading: boolean;
  isNearbyOfferDataLoading: boolean;
}

const initialState : InitialState = {
  location: LOCATIONS[0],
  offer: null,
  offers: [],
  nearbyOffers: [],
  review: null,
  reviews: [],
  sortType: SortTypes.DEFAULT,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOfferDataLoading: false,
  isNearbyOfferDataLoading: false
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
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setNearbyOffersStatus, (state, action) => {
      state.isNearbyOfferDataLoading = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReview, (state, action) => {
      state.review = action.payload;
    });
});
