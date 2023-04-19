import {Offers} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferCardListProps = {
  offers: Offers;
}

function OfferCardList(offers : OfferCardListProps) : JSX.Element {
  const list = offers.offers.map((offer) => (
    <OfferCard key={offer.id} offer={offer} />
  ));

  return (
    <div className="cities__places-list places__list tabs__content">
      {list}
    </div>
  );
}

export default OfferCardList;
