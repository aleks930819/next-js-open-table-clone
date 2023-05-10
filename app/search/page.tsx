import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestuarntCard from './components/RestuarntCard';
import { PrismaClient, Cuisine, Location, PRICE } from '@prisma/client';
const prisma = new PrismaClient();

export interface ReasturantCardType {
  id: number;
  name: string;
  main_image: string;
  location: Location;
  price: PRICE;
  Cuisine: Cuisine | null;
  slug: string;
}

const select = {
  id: true,
  name: true,
  main_image: true,
  location: true,
  price: true,
  Cuisine: true,
  slug: true,
};

const fetchRestaurantsByLocation = async (
  location: string
): Promise<ReasturantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          contains: location.toLowerCase(),
        },
      },
    },

    select,
  });

  if (!restaurants) throw new Error('Restaurant not found');
  return restaurants;
};

const Search = async ({
  searchParams,
}: {
  searchParams: { location: string };
}) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams.location);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestuarntCard key={restaurant.id} reasturant={restaurant} />
            ))
          ) : (
            <h1 className="text-center text-2xl">No restaurants found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
