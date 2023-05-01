import {render, screen} from '@testing-library/react';
import NearPlacesCard from './near-places-card';
import {makeFakeOffer} from '../../utils/mocks';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';

const history = createMemoryHistory();

describe('Component NearPlacesCard', () => {
  it('should render correctly', () => {
    const fakeOffer = makeFakeOffer();

    render(
      <HistoryRouter history={history}>
        <NearPlacesCard place={fakeOffer} />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });
});
