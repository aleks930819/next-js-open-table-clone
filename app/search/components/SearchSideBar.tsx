import { Location, Cuisine } from '@prisma/client';
import Link from 'next/link';
import { PRICE } from '@prisma/client';

const SearchSideBar = ({
  location,
  cuisine,
  searchParams,
}: {
  location: Location[];
  cuisine: Cuisine[];
  searchParams: { location?: string; cuisine?: string; price?: PRICE };
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: '$',
    },
    {
      price: PRICE.REGULAR,
      label: '$$',
    },
    {
      price: PRICE.EXPENSIVE,
      label: '$$$',
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {location.map((loc) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                location: loc.name,
              },
            }}
            className="font-light text-reg  capitalize flex flex-col"
            key={loc.id}
          >
            {loc.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisine.map((cui) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cui.name,
              },
            }}
            className="font-light text-reg capitalize flex flex-col"
            key={cui.id}
          >
            {cui.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label }) => (
            <Link
              key={price}
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className="border w-full text-reg font-light rounded-l p-2 text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
