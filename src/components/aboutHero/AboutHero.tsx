import './AboutHero.scss';

const AboutHero = () => {
  return (
    <header
      className='about-hero'
      role='banner'
      aria-labelledby='about-hero-title'
      aria-describedby='about-hero-description'
    >
      <div className='about-hero__container'>
        <div className='about-hero__wrapper'>
          <h1 id='about-hero-title' className='about-hero__wrapper--heading'>
            About us
          </h1>

          <p
            id='about-hero-description'
            className='about-hero__wrapper--paragraph'
          >
            Welcome to our blog! Here, we share insightful articles, tips, and
            stories on a variety of topics that matter to you. Whether you're
            looking for the latest trends, in-depth analyses, or just some light
            reading, you'll find it all here.
          </p>
        </div>
      </div>
    </header>
  );
};

export default AboutHero;
