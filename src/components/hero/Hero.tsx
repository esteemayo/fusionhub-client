import './Hero.scss';

const Hero = () => {
  return (
    <header className='hero'>
      <div className='hero__breadCrumbs'>
        <span>Home</span>
        {'|'}
        <span>Post details</span>
      </div>
      <h1 className='hero__heading'>Go boating and experience</h1>
    </header>
  );
};

export default Hero;
