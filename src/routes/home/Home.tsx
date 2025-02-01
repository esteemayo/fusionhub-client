import Header from '../../components/header/Header';
import Features from '../../components/features/Features';

import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <Header />
        <Features />
      </div>
    </div>
  );
};

export default Home;
