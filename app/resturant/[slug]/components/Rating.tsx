import { Review } from '@prisma/client';
import { calculateAvarageReviewsRating } from '../../../../utils/calculateAverageReviewsRating';

const Rating = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>*****</p>
        <p className="text-reg ml-3">{calculateAvarageReviewsRating(reviews)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  );
};

export default Rating;
