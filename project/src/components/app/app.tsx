import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../consts';
import Layout from '../layout/layout';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {getOffers, getOfferDataLoadingStatus} from '../../store/offer-data/selectors';

function App(): JSX.Element {

  const offers = useAppSelector(getOffers);

  const isOffersDataLoading = useAppSelector(getOfferDataLoadingStatus);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route
          path={AppRoute.Main}
          element={<MainScreen offers={offers} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Offer}
          element={<PropertyScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Route>
    </Routes>
  );
}

export default App;
