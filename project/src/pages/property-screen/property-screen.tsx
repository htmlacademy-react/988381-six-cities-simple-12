import {Offer, Offers} from '../../types/offer';
import {useParams} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import NearPlacesList from '../../near-places-list/near-places-list';

type PropertyScreenProps = {
  offers: Offers;
}

function PropertyScreen({offers} : PropertyScreenProps) : JSX.Element {
  const params = useParams();
  const currentId = Number(params.id);

  const currentOffer = offers.find((offer) => offer.id === currentId) as Offer || undefined;

  const {images, title, type, price, rating, isPremium, bedrooms, adults, features, host, description, reviews} = currentOffer;

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image) => (
              <div key={image.id} className="property__image-wrapper">
                <img className="property__image" src={image.src} alt="Studio" />
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
                {adults}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {features.map((feature) => (
                  <li key={feature} className="property__inside-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={host.image.src} width="74" height="74" alt="Host avatar" />
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
                {description.map((paragraph) => (
                  <p key={paragraph} className="property__text">
                    {paragraph}
                  </p>
                ))}
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
