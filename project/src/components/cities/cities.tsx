import {useState} from 'react';
import OfferCardList from '../offer-card-list/offer-card-list';
import Map from '../map/map';
import {Offers} from '../../types/offer';

type CitiesProps = {
  offers: Offers;
  activeLocation: string;
}

function Cities({offers, activeLocation} : CitiesProps) : JSX.Element {
  const [activeCardId, setActiveCard] = useState<number | null>(null);

  const onChangeActiveCard = (id: number | null) => {
    setActiveCard(id);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {activeLocation}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <OfferCardList offers={offers} onChangeActiveCard={onChangeActiveCard} />
      </section>
      <div className="cities__right-section">
        <Map className="cities" offers={offers} activeCardId={activeCardId}/>
      </div>
    </div>
  );
}

export default Cities;
