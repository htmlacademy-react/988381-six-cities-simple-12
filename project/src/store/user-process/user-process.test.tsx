import {UserProcess} from '../../types/state';
import {AuthorizationStatus} from '../../consts';
import {userProcess} from './user-process';
import {checkAuthAction, loginAction, logoutAction} from '../api-action';
import {makeFakeUserData} from '../../utils/mocks';

const fakeUserData = makeFakeUserData();
describe('Reducer user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userData: null});
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: fakeUserData}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: fakeUserData});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });
});
