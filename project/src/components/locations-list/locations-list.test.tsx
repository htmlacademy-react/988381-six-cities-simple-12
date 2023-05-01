import {render, screen} from '@testing-library/react';
import LocationsList from './locations-list';
import {LOCATIONS} from '../../consts';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component LocationsList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        location: LOCATIONS[0]
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationsList locations={LOCATIONS} activeLocation={LOCATIONS[0]} />
        </HistoryRouter>
      </Provider>
    );

    const locationsLength = Object.values(LOCATIONS).length;
    expect(screen.getAllByRole('link').length).toBe(locationsLength);
  });
});
