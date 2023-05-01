import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {makeFakeUserData} from '../../utils/mocks';
import {AuthorizationStatus} from '../../consts';
import Header from './header';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeUserData = makeFakeUserData();

describe('Component Header', () => {
  it('should render correctly when user not authed', () => {
    const store = mockStore({
      'USER': {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly when user authed', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeUserData.email)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
