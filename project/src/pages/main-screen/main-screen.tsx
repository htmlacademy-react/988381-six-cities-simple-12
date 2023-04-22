import {useEffect, useState} from 'react';
import {Offers} from '../../types/offer';
import LocationsList from '../../components/locations-list/locations-list';
import {LOCATIONS} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setLocation} from '../../store/action';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities-empty/cities-empty';

type MainScreenProps = {
  offers: Offers;
}

function MainScreen({offers} : MainScreenProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const activeLocation = useAppSelector((state) => state.location);

  const [currentOffers, setCurrentOffers] = useState<Offers>([]);

  const isOffers = Boolean(currentOffers.length);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.title === activeLocation);
    setCurrentOffers(filteredOffers);
  }, [activeLocation, offers]);

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${isOffers ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList locations={LOCATIONS} activeLocation={activeLocation} onChangeActiveLocation={(e) => dispatch(setLocation(e))}/>
          </section>
        </div>
        <div className="cities">
          {
            isOffers ?
              <Cities offers={currentOffers} activeLocation={activeLocation} />
              :
              <CitiesEmpty />
          }
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
