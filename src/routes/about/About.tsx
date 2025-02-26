import AboutHero from '../../components/aboutHero/AboutHero';
import AboutItems from '../../components/aboutItems/AboutItems';

import './About.scss';

const About = () => {
  return (
    <div className='about'>
      <div className='about__container'>
        <AboutHero />
        <AboutItems />
      </div>
    </div>
  );
};

export default About;
