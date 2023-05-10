import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestuarntCard from './components/RestuarntCard';
import { PrismaClient, Cuisine, Location, PRICE } from '@prisma/client';
const prisma = new PrismaClient();

interface SearchParams {
  location?: string;
  cuisine?: string;
  price?: PRICE;
}

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

const fetchRestaurantsByLocation = async (searchParams: SearchParams): Promise<ReasturantCardType[]> => {
  const where: any = {};

  if(searchParams.location) {
    where.location = {
      name: {
        contains: searchParams.location.toLowerCase(),
      },
    };
  }

  if(searchParams.cuisine) {
    where.Cuisine = {
      name: {
        contains: searchParams.cuisine.toLowerCase(),
      },
    };
  }

  if(searchParams.price) {
    where.price = searchParams.price;
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
  
};

const fetchLocations = async () => {
  return prisma.location.findMany();
};
const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
};

const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start mt-10">
        <SearchSideBar
          location={locations}
          cuisine={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6 ml-10">
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
