import { Review } from '@prisma/client';

export const calculateAvarageReviewsRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
 return (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
};
