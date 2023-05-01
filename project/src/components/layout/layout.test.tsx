import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Layout from './layout';
import {render, screen} from '@testing-library/react';
import {Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../consts';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component Layout', () => {
  global.scrollTo = jest.fn();

  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Layout />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
