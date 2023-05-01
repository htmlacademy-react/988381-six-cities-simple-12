import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {LOCATIONS} from '../../consts';
import {render, screen} from '@testing-library/react';
import LocationCard from './location-card';
import HistoryRouter from '../history-route/history-route';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component LocationCard', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        location: LOCATIONS[0]
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationCard location={LOCATIONS[0]} isActive />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(LOCATIONS[0])).toBeInTheDocument();
  });
});
