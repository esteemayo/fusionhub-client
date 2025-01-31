import Feature from '../feature/Feature';
import FeatureCard from '../featureCard/FeatureCard';

import './Features.scss';

const Features = () => {
  return (
    <section className='features'>
      <div className='features__container'>
        <div className='features__wrapper'>
          <Feature />
        </div>
        <div className='features__box'>
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </div>
    </section>
  );
};

export default Features;
