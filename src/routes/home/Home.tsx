import Features from '../../components/features/Features';
import Header from '../../components/header/Header';
import RecentPosts from '../../components/recentPosts/RecentPosts';

import SearchClient from './searchClient/SearchClient';

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
