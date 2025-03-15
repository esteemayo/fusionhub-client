import { useEffect, useState } from 'react';

import FeatureCard from '../featureCard/FeatureCard';
import Feature from '../feature/Feature';
import FeatureSkeleton from '../featureSkeleton/FeatureSkeleton';

import { postItems } from '../../data';

import './Features.scss';

const Features = () => {
  const [isLoading, setIsLoading] = useState(true);

  const featuredPosts = postItems.filter((post) => post.isFeatured === true);

  const [firstPost, ...otherPosts] = featuredPosts;

  // useEffect(() => {
  //   setTimeout(() => setIsLoading(false), 5000);
  // }, []);

  return (
    <section className='features'>
      <div className='features__container'>
        <h3 className='features__container--heading'>Featured articles</h3>
        <div className='features__wrapper'>
          <div className='features__wrap'>
            {isLoading ? <FeatureSkeleton /> : <Feature {...firstPost} />}
          </div>
          <div className='features__box'>
            {otherPosts?.map((post) => {
              return <FeatureCard key={post.id} {...post} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
