import {render, screen} from '@testing-library/react';
import OfferCardListSort from './offer-card-list-sort';
import {SortTypes} from '../../consts';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component OfferCardListSort', () => {
  const sortTypes = Object.values(SortTypes);

  const store = mockStore({
    sortType: SortTypes.DEFAULT
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferCardListSort />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(sortTypes.length);
  });
});
