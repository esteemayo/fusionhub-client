import HeaderClient from '../../components/headerClient/HeaderClient';
import Features from '../../components/features/Features';
import SearchClient from '../../components/searchClient/SearchClient';
import RecentPosts from '../../components/recentPosts/RecentPosts';

import './Home.scss';

const Home = () => {
  return (
    <main className='home' role='main' aria-label='Homepage'>
      <a href='#main-content' className='sr-only'>
        Skip to main content
      </a>

      <div id='main-content' className='home__container'>
        <HeaderClient />
        <SearchClient />
        <Features />
        <RecentPosts />
      </div>
    </main>
  );
};

export default Home;
