import {Offer} from '../../types/offer';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type OfferCardProps = {
  offer: Offer;
  onMouseEnterHandler: () => void;
  onMouseLeaveHandler: () => void;
};

function OfferCard({offer, onMouseEnterHandler, onMouseLeaveHandler}: OfferCardProps) : JSX.Element {
  const {id, images, title, type, price, rating, isPremium} = offer;
  const route = generatePath(AppRoute.Offer, {
    id: `${id}`
  });

  return (
    <article className="cities__card place-card" onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={route}>
          <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${20 * Math.floor(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={route}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
