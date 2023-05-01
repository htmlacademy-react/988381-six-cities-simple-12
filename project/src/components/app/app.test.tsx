import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus, LOCATIONS, SortTypes} from '../../consts';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {render, screen} from '@testing-library/react';
import {makeFakeNearbyOffers, makeFakeOffer} from '../../utils/mocks';
import {generatePath} from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';

global.scrollTo = jest.fn();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = makeFakeOffer();
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
    reviews: [],
    hasError: false,
    isReviewSending: false
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getAllByText(/Sign in/i).length).toBe(2);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole(/button/i)).toBeInTheDocument();
  });

  it('should render "PropertyScreen" when user navigate to "/offer/1"', () => {
    history.push(generatePath(AppRoute.Offer, {id: '1'}));

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });
});
