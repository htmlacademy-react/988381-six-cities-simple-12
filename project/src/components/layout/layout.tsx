import {Outlet, useLocation} from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Header from '../../components/header/header';
import {AppRoute} from '../../const';

function Layout() : JSX.Element {
  const location = useLocation();
  let className;

  switch (location.pathname) {
    case AppRoute.Main:
      className = 'page page--gray page--main';
      break;
    case AppRoute.Login:
      className = 'page page--gray page--login';
      break;
    default:
      className = 'page';
  }

  return (
    <div className={className}>
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
