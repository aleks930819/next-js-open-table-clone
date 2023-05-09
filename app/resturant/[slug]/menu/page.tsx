import Header from '../components/Header';
import RestaurantNavbar from '../components/RestaurantNavbar';
import Menu from './components/Menu';

const ResturantMenu = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Menu />
      </div>
    </>
  );
};

export default ResturantMenu;
