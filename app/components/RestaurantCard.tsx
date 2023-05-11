import Link from 'next/link';
import { ReasturantCardType } from '../page';
import Price from './Price';
import { calculateAvarageReviewsRating } from '../../utils/calculateAverageReviewsRating';
import Stars from './Stars';

interface Props {
  restaurant: ReasturantCardType;
}

const RestaurantCard = ({ restaurant }: Props) => {
  const renderRatingText = () => {
    const rating = calculateAvarageReviewsRating(restaurant.reviews);

    if (Number(rating) === 0) return '';

    if (Number(rating) < 2) return 'Averge';

    if (Number(rating) < 4) return 'Good';

    if (Number(rating) < 4.5) return 'Amazing';

    return rating;
  };
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/resturant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2 text-sm">{renderRatingText()}</p>
            <p className="ml-2">{restaurant.reviews.length} reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.Cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
