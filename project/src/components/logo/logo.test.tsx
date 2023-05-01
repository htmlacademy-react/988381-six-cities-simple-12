import {render, screen} from '@testing-library/react';
import Logo from './logo';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';

const history = createMemoryHistory();

describe('Component Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
