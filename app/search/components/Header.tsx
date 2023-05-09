import Searchbar from '../../components/Searchbar';

const Header = () => {
  return (
    <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
      <div className="text-left text-lg py-3 m-auto flex justify-center">
        <Searchbar />
      </div>
    </div>
  );
};

export default Header;
