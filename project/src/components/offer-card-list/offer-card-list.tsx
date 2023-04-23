import {useEffect, useState} from 'react';
import {Offers} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferCardListProps = {
  offers: Offers;
  onChangeActiveCard: (id: number | null) => void;
}

function OfferCardList({offers, onChangeActiveCard} : OfferCardListProps) : JSX.Element {
  const [activeCardId, setActiveCard] = useState<number | null>(null);

  const list = offers.map((offer) => (
    <OfferCard key={offer.id} offer={offer} onMouseEnterHandler={() => setActiveCard(offer.id)} onMouseLeaveHandler={() => setActiveCard(null)}/>
  ));

  useEffect(() => {
    onChangeActiveCard(activeCardId);
  });

  return (
    <div className="cities__places-list places__list tabs__content">
      {list}
    </div>
  );
}

export default OfferCardList;
