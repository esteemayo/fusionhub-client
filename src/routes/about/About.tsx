import AboutHero from '../../components/aboutHero/AboutHero';
import Team from '../../components/team/Team';
import AboutItems from '../../components/aboutItems/AboutItems';
import Partners from '../../components/partners/Partners';

import './About.scss';

const About = () => {
  return (
    <div className='about'>
      <div className='about__container'>
        <AboutHero />
        <AboutItems />
        <Team />
        <Partners />
      </div>
    </div>
  );
};

export default About;
