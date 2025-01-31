import Feature from '../feature/Feature';

import './Features.scss';

const Features = () => {
  return (
    <section className='features'>
      <div className='features__container'>
        <div className='features__wrapper'>
          <Feature />
        </div>
        <div className='features__box'>
          <article>feature card</article>
          <article>feature card</article>
          <article>feature card</article>
        </div>
      </div>
    </section>
  );
};

export default Features;
