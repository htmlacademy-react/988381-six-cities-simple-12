import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import Cities from './cities';
import {makeFakeOffers} from '../../utils/mocks';
import {LOCATIONS} from '../../consts';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeOffers = makeFakeOffers();

describe('Component Cities', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        location: LOCATIONS[0],
        offers: fakeOffers
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Cities offers={fakeOffers} activeLocation={'Paris'} />
        </HistoryRouter>
      </Provider>
    );

    const offersLength = fakeOffers.length;
    expect(screen.getByText(`${offersLength} places to stay in Paris`)).toBeInTheDocument();
  });
});
