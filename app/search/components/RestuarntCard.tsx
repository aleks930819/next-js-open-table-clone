import Link from 'next/link';
import { ReasturantCardType } from '../page';
import Price from '../../components/Price';
import Stars from '../../components/Stars';

const RestuarntCard = ({ reasturant }: { reasturant: ReasturantCardType }) => {
  return (
    <div className="border-b flex pb-5">
      <img
        src={reasturant.main_image}
        alt=""
        className="w-44 h-36 rounded object-cover"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{reasturant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={reasturant.reviews} />
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <p className="mr-4">
              <Price price={reasturant.price} />
            </p>
            <p className="mr-4 capitalize">{reasturant.Cuisine?.name}</p>
            <p className="mr-4">{reasturant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/resturant/${reasturant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestuarntCard;
