import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {rootReducer} from '../root-reducer';
import browserHistory from '../../browserHistory';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'game/redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
