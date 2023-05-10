import { Review } from '@prisma/client';

import fullStar from '../../public/icons/full-star.png';
import halfStar from '../../public/icons/half-star.png';
import emptyStar from '../../public/icons/empty-star.png';
import Image from 'next/image';
import { calculateAvarageReviewsRating } from '../../utils/calculateAverageReviewsRating';

const Stars = ({ reviews }: { reviews: Review[] }) => {
  const rating = calculateAvarageReviewsRating(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (Number(rating) >= i) {
        stars.push(fullStar);
      } else if (Number(rating) >= i - 0.5) {
        stars.push(halfStar);
      } else {
        stars.push(emptyStar);
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars().map((star, index) => (
        <div key={index} className="w-4 h-4">
          <Image src={star} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Stars;
