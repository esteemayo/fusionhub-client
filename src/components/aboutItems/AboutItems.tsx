import AboutItem from '../aboutItem/AboutItem';

import { aboutItems } from '../../data';

import './AboutItems.scss';

const AboutItems = () => {
  return (
    <section className='about-items'>
      <div className='about-items__container'>
        {aboutItems.map((item) => {
          return <AboutItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default AboutItems;
