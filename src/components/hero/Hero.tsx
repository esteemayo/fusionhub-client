import { Link } from 'react-router-dom';

import './Hero.scss';

const Hero = () => {
  return (
    <header className='hero'>
      <div className='hero__breadCrumbs'>
        <Link to='/' className='hero__breadCrumbs--link'>
          Home
        </Link>
        {'|'}
        <Link to='#' className='hero__breadCrumbs--link'>
          Post details
        </Link>
      </div>
      <h1 className='hero__heading'>Go boating and experience</h1>
    </header>
  );
};

export default Hero;
