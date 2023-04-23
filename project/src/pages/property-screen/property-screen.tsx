import {Offer, Offers} from '../../types/offer';
import {useParams} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import NearPlacesList from '../../near-places-list/near-places-list';
import {Reviews} from '../../types/review';

type PropertyScreenProps = {
  offers: Offers;
  reviews: Reviews;
}

function PropertyScreen({offers, reviews} : PropertyScreenProps) : JSX.Element {
  const params = useParams();
  const currentId = Number(params.id);

  const currentOffer = offers.find((offer) => offer.id === currentId) as Offer || undefined;

  const {bedrooms, description, goods, host, images, isPremium, maxAdults, price,rating, title, type} = currentOffer;

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${20 * Math.floor(rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                {maxAdults}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good) => (
                  <li key={good} className="property__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {host.name}
                </span>
                {host.isPro && (
                  <span className="property__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="property__description">
                <p className="property__text">{description}</p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{Object.keys(reviews).length}</span></h2>
              <ReviewsList reviews={reviews} />
              <ReviewForm />
            </section>
          </div>
        </div>
        <Map className="property" offers={offers} activeCardId={currentId}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearPlacesList places={offers} currentId={currentId}/>
        </section>
      </div>
    </main>
  );
}

export default PropertyScreen;
