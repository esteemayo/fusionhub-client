import HeaderClient from '../../components/headerClient/HeaderClient';
import Features from '../../components/features/Features';
import SearchClient from '../../components/searchClient/SearchClient';
import RecentPosts from '../../components/recentPosts/RecentPosts';

import './Home.scss';
// Web Share API
const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <HeaderClient />
        <SearchClient />
        <Features />
        <RecentPosts />
      </div>
    </div>
  );
};

export default Home;
