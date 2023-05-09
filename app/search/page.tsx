import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestuarntCard from './components/RestuarntCard';

const Search = () => {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          <RestuarntCard />
        </div>
      </div>
    </>
  );
};

export default Search;
