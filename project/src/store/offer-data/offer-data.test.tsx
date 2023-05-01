import {makeFakeOffer, makeFakeOffers} from '../../utils/mocks';
import {OfferData} from '../../types/state';
import {LOCATIONS, SortTypes} from '../../consts';
import {offerData, setCurrentLocation, setSortType} from './offer-data';
import {fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction} from '../api-action';

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();

describe('Reducer offerData', () => {
  let state: OfferData;

  beforeEach(() => {
    state = {
      location: LOCATIONS[0],
      offer: null,
      offers: [],
      nearbyOffers: [],
      isOfferDataLoading: false,
      hasError: false,
      sortType: SortTypes.DEFAULT
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offerData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchOfferAction test', () => {
    it('should pending update offer if fetchOfferAction status is pending', () => {
      state.hasError = false;

      expect(offerData.reducer(state, {type: fetchOfferAction.pending.type}))
        .toEqual(state);
    });

    it('should update offer if fetchOfferAction status is fulfilled', () => {
      state.offer = fakeOffer;
      state.hasError = false;

      expect(offerData.reducer(state, {type: fetchOfferAction.fulfilled.type, payload: fakeOffer}))
        .toEqual(state);
    });

    it('should reject update offer if fetchOfferAction status is rejected', () => {
      state.hasError = true;

      expect(offerData.reducer(state, {type: fetchOfferAction.rejected.type}))
        .toEqual(state);
    });
  });

  describe('fetchOffersAction test', () => {
    it('should pending update offers if fetchOffersAction status is pending', () => {
      state.isOfferDataLoading = true;

      expect(offerData.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual(state);
    });

    it('should update offers if fetchOffersAction status is fulfilled', () => {
      state.offers = fakeOffers;
      state.isOfferDataLoading = false;

      expect(offerData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: fakeOffers}))
        .toEqual(state);
    });
  });

  describe('fetchNearbyOffersAction test', () => {
    it('should update nearbyOffers if fetchNearbyOffersAction status is fulfilled', () => {
      state.isOfferDataLoading = true;

      expect(offerData.reducer(state, {type: fetchNearbyOffersAction.pending.type, payload: fakeOffers}))
        .toEqual(state);
    });
  });

  describe('reducers test', () => {
    it('should set current location', () => {
      state.location = LOCATIONS[1];
      expect(offerData.reducer(state, {type: setCurrentLocation, payload: LOCATIONS[1]})).toEqual(state);
    });

    it('should set sort type', () => {
      state.sortType = SortTypes.PRICE_TO_HIGH;
      expect(offerData.reducer(state, {type: setSortType, payload: SortTypes.PRICE_TO_HIGH})).toEqual(state);
    });
  });
});
