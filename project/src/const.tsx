export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id'
}

export const RATING_DATA = [
  {
    value: '5',
    title: 'perfect'
  },
  {
    value: '4',
    title: 'good'
  },
  {
    value: '3',
    title: 'not bad'
  },
  {
    value: '2',
    title: 'badly'
  },
  {
    value: '1',
    title: 'terribly'
  }
] as const;

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';
