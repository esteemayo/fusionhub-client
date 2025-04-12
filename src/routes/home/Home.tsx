import { useEffect, useState } from 'react';

import RecentPosts from '../../components/recentPosts/RecentPosts';
import Header from '../../components/header/Header';
import SearchClient from '../../components/searchClient/SearchClient';
import Features from '../../components/features/Features';
import HeaderSkeleton from '../../components/headerSkeleton/HeaderSkeleton';

import { randomPostItems } from '../../data';

import './Home.scss';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div className='home'>
      <div className='home__container'>
        {isLoading ? <HeaderSkeleton /> : <Header posts={randomPostItems} />}
        <SearchClient />
        <Features />
        <RecentPosts />
      </div>
    </div>
  );
};

export default Home;
