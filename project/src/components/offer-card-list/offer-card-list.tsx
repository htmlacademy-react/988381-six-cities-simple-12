import {useEffect, useState} from 'react';
import {Offers} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import {useAppSelector} from '../../hooks';
import {getSortType} from '../../store/offer-data/selectors';
import {SortTypes} from '../../consts';

type OfferCardListProps = {
  offers: Offers;
  onChangeActiveCard: (id: number | null) => void;
}

const sortOffers = (offers: Offers, sortType: string) => {
  switch (sortType) {
    case SortTypes.PRICE_TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortTypes.PRICE_TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortTypes.RATING:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

function OfferCardList({offers, onChangeActiveCard} : OfferCardListProps) : JSX.Element {
  const [activeCardId, setActiveCard] = useState<number | null>(null);

  const sortType = useAppSelector(getSortType);

  offers = sortOffers(offers, sortType);

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
