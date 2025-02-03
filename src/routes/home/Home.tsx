import RecentPosts from '../../components/recentPosts/RecentPosts';
import Header from '../../components/header/Header';
import SearchClient from '../../components/searchClient/SearchClient';
import Features from '../../components/features/Features';

import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <Header />
        <SearchClient />
        <Features />
        <RecentPosts />
      </div>
    </div>
  );
};

export default Home;
