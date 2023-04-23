import {FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-action';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';

function LoginScreen() : JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const checkPassword = (password: string) => {
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return pattern.test(password);
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const onSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && (passwordRef.current !== null && checkPassword(passwordRef.current.value))) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value
      });
    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={onSubmitHandle}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#todo">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
