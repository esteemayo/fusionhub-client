import AboutHero from '../../components/aboutHero/AboutHero';
import Team from '../../components/team/Team';
import AboutItems from '../../components/aboutItems/AboutItems';
import Partners from '../../components/partners/Partners';

import './About.scss';

const About = () => {
  return (
    <main
      className='about'
      role='main'
      tabIndex={-1}
      aria-labelledby='about-page-title'
    >
      <div className='about__container'>
        <h1 id='about-page-title' className='sr-only'>
          About Us
        </h1>

        <AboutHero />
        <AboutItems />
        <Team />
        <Partners />
      </div>
    </main>
  );
};

export default About;
