import React from 'react';
import Logo from '../logo/logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus, getUserData} from '../../store/user-process/selectors';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-action';

function Header() : JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);

  const handleSignOut = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{userData?.email}</span>
                  </div>}
              </li>
              <li className="header__nav-item">
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link className="header__nav-link" to={AppRoute.Login} onClick={handleSignOut}>
                    <span className="header__signout">Sign out</span>
                  </Link>}
                {authorizationStatus === AuthorizationStatus.NoAuth &&
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign in</span>
                  </Link>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
