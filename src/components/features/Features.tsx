import Feature from '../feature/Feature';
import FeatureCard from '../featureCard/FeatureCard';

import './Features.scss';

const Features = () => {
  return (
    <section className='features'>
      <div className='features__container'>
        <h3 className='features__container--heading'>Featured articles</h3>
        <div className='features__wrapper'>
          <div className='features__wrap'>
            <Feature />
          </div>
          <div className='features__box'>
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
