import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {Action} from '@reduxjs/toolkit';
import {APIRoute} from '../consts';
import {
  checkAuthAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  loginAction, logoutAction, sendReviewAction
} from './api-action';
import {AuthData} from '../types/auth-data';
import {redirectToRoute} from './action';
import {makeFakeOffer, makeFakeOffers, makeFakeReview, makeFakeReviews} from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch fetchOfferAction when GET /hotels:id', async () => {
    const fakeOffer = makeFakeOffer();
    const offerId = 1;

    mockAPI
      .onGet(`${APIRoute.Offers}/${offerId}`)
      .reply(200, fakeOffer);

    const store = mockStore();
    await store.dispatch(fetchOfferAction(offerId));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOffersAction when GET /hotels', async () => {
    const fakeOffers = makeFakeOffers();

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchNearbyOffersAction when GET /hotels:id/nearby', async () => {
    const fakeOffers = makeFakeOffers();
    const offerId = 1;

    mockAPI
      .onGet(`${APIRoute.Offers}/${offerId}/nearby`)
      .reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchNearbyOffersAction(offerId));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /comments/:offerId', async () => {
    const fakeReviews = makeFakeReviews();
    const offerId = 1;

    mockAPI
      .onGet(`${APIRoute.Reviews}/${offerId}`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(offerId));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it ('should dispatch sendReviewAction when POST /comments/:offerId', async () => {
    const fakeReviews = makeFakeReviews();
    const offerId = 1;
    const fakeReview = makeFakeReview();
    fakeReview.id = offerId;

    mockAPI
      .onPost(`${APIRoute.Reviews}/${offerId}`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(sendReviewAction(fakeReview));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
