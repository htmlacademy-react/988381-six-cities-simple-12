import {useState} from 'react';
import OfferCardListSort from '../offer-card-list-sort/offer-card-list-sort';
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
        <OfferCardListSort/>
        <OfferCardList offers={offers} onChangeActiveCard={onChangeActiveCard} />
      </section>
      <div className="cities__right-section">
        <Map className="cities" offers={offers} activeCardId={activeCardId}/>
      </div>
    </div>
  );
}

export default Cities;
