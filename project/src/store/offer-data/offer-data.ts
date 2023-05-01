import {OfferData} from '../../types/state';
import {LOCATIONS, NameSpace, SortTypes} from '../../consts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction} from '../api-action';

const initialState: OfferData = {
  location: LOCATIONS[0],
  offer: null,
  offers: [],
  nearbyOffers: [],
  isOfferDataLoading: false,
  hasError: false,
  sortType: SortTypes.DEFAULT
};

export const offerData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setCurrentLocation: (state, action : PayloadAction<string>) => {
      state.location = action.payload;
    },
    setSortType: (state, action : PayloadAction<string>) => {
      state.sortType = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.hasError = true;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});

export const {setCurrentLocation, setSortType} = offerData.actions;
