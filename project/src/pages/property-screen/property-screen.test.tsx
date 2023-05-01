import {render, screen} from '@testing-library/react';
import PropertyScreen from './property-screen';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, LOCATIONS, SortTypes} from '../../consts';
import {makeFakeNearbyOffers, makeFakeOffer, makeFakeReviews} from '../../utils/mocks';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();
const fakeNearbyOffers = makeFakeNearbyOffers();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
  },
  DATA: {
    location: LOCATIONS[0],
    offer: fakeOffer,
    offers: [],
    nearbyOffers: fakeNearbyOffers,
    isOfferDataLoading: false,
    hasError: false,
    sortType: SortTypes.DEFAULT
  },
  REVIEW: {
    reviews: fakeReviews,
    hasError: false,
    isReviewSending: false
  }
});

const fakePropertyScreen = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <PropertyScreen />
    </HistoryRouter>
  </Provider>
);

describe('Component PropertyScreen', () => {
  it('should render correctly', () => {
    render(fakePropertyScreen);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.host.name)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
