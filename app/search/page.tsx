import Link from 'next/link';
import Navbar from '../components/Navbar';
import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestuarntCard from './components/RestuarntCard';

const Search = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <Navbar />
        <Header />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSideBar />
          <div className="w-5/6">
            <RestuarntCard />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Search;
