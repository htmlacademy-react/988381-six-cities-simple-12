import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import './style.css';

function NotFoundScreen() : JSX.Element {
  return (
    <main className="page__main page__main--not-found">
      <section className="not-found">
        <h1 className="not-found__title">404 Not Found</h1>
        <Link className="not-found__link" to={AppRoute.Main}>На главную</Link>
      </section>
    </main>
  );
}

export default NotFoundScreen;
