import {useEffect, useState} from 'react';
import {Offers} from '../../types/offer';
import LocationsList from '../../components/locations-list/locations-list';
import {LOCATIONS} from '../../consts';
import {useAppSelector} from '../../hooks';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities-empty/cities-empty';
import {getCurrentLocation} from '../../store/offer-data/selectors';

type MainScreenProps = {
  offers: Offers;
}

function MainScreen({offers} : MainScreenProps) : JSX.Element {
  const activeLocation = useAppSelector(getCurrentLocation);

  const [currentOffers, setCurrentOffers] = useState<Offers>([]);

  const isOffers = Boolean(currentOffers.length);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === activeLocation);
    setCurrentOffers(filteredOffers);
  }, [activeLocation, offers]);

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${isOffers ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList locations={LOCATIONS} activeLocation={activeLocation}/>
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
