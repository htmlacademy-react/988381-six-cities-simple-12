import {render, screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
describe('Component NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <Router location={history.location} navigator={history}>
        <NotFoundScreen />
      </Router>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });
});
