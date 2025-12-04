import AboutItem from '../aboutItem/AboutItem';

import { aboutItems } from '../../data';

import './AboutItems.scss';

const AboutItems = () => {
  return (
    <section
      className='about-items'
      role='region'
      aria-labelledby='about-items-heading'
    >
      <div className='about-items__container'>
        <h2 id='about-items-heading' className='sr-only'>
          About Us Information
        </h2>

        {aboutItems.map((item) => {
          return <AboutItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default AboutItems;
