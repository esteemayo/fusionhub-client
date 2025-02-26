import AboutItem from '../aboutItem/AboutItem';

import './AboutItems.scss';

const AboutItems = () => {
  return (
    <section className='about-items'>
      <div className='about-items__container'>
        <AboutItem />
        <AboutItem />
        <AboutItem />
        <AboutItem />
      </div>
    </section>
  );
};

export default AboutItems;
