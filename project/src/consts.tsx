export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum APIRoute {
  Offers = '/hotels',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  Data = 'DATA',
  Review = 'REVIEW',
  User = 'USER'
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

export const Markers = {
  URL_MARKER_DEFAULT: 'img/pin.svg',
  URL_MARKER_CURRENT: 'img/pin-active.svg'
};

export const CommentParameters = {
  MIN_COMMENT_LENGTH: 50,
  MAX_COMMENT_LENGTH: 300,
  MAX_COMMENTS_COUNT: 10
};

export const LOCATIONS = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const SortTypes = {
  DEFAULT: 'Popular',
  PRICE_TO_HIGH: 'Price: low to high',
  PRICE_TO_LOW: 'Price: high to low',
  RATING: 'Top rated first'
};
