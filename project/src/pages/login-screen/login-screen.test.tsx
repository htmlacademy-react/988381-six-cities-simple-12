import {fireEvent, render, screen} from '@testing-library/react';
import LoginScreen from './login-screen';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from '../../consts';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null
  }
});

describe('Component LoginScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

    const email = screen.getByPlaceholderText(/Email/i);
    const password = screen.getByPlaceholderText(/Password/i);

    expect(screen.getAllByText(/Sign in/i).length).toBe(2);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    fireEvent.change(email, {target: {value: 'Oliver.conner@gmail.com'}});
    fireEvent.change(password, {target: {value: 'G#o2NzP@sh4Pz'}});

    expect(screen.getByDisplayValue(/Oliver.conner@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/G#o2NzP@sh4Pz/i)).toBeInTheDocument();
  });
});
