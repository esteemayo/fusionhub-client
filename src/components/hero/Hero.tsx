import { Link } from 'react-router-dom';

import { HeroProps } from '../../types';

import './Hero.scss';

const Hero = ({ slug, title }: HeroProps) => {
  return (
    <header className='hero'>
      <div className='hero__breadCrumbs'>
        <Link to='/' className='hero__breadCrumbs--link'>
          Home
        </Link>
        <Link to={`/posts/${slug}`} className='hero__breadCrumbs--link'>
          Post details
        </Link>
      </div>
      <h1 className='hero__heading'>{title}</h1>
    </header>
  );
};

export default Hero;
