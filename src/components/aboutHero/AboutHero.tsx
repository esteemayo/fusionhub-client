import './AboutHero.scss';

const AboutHero = () => {
  return (
    <header className='about-hero'>
      <div className='about-hero__container'>
        <div className='about-hero__wrapper'>
          <h1 className='about-hero__wrapper--heading'>About us</h1>
          <p className='about-hero__wrapper--paragraph'>
            Welcome to our blog! Here, we share insightful articles, tips, and
            stories on a variety of topics that matter to you. Our team of
            dedicated writers and experts are passionate about delivering
            high-quality content that informs, inspires, and engages our
            readers. Whether you're looking for the latest trends, in-depth
            analyses, or just some light reading, you'll find it all here. Thank
            you for visiting, and we hope you enjoy exploring our blog as much
            as we enjoy creating it for you.
          </p>
        </div>
      </div>
    </header>
  );
};

export default AboutHero;
