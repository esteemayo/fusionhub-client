import { useEffect, useState } from 'react';

import Feature from '../feature/Feature';
import FeatureCard from '../featureCard/FeatureCard';

import FeatureSkeleton from '../featureSkeleton/FeatureSkeleton';
import FeatureCardSkeleton from '../featureCardSkeleton/FeatureCardSkeleton';

import { postItems } from '../../data';

import './Features.scss';

const Features = () => {
  const [isLoading, setIsLoading] = useState(true);

  const featuredPosts = postItems.filter((post) => post.isFeatured === true);

  const [firstPost, ...otherPosts] = featuredPosts;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <section className='features'>
      <div className='features__container'>
        <h3 className='features__container--heading'>Featured articles</h3>
        <div className='features__wrapper'>
          <div className='features__wrap'>
            {isLoading ? <FeatureSkeleton /> : <Feature {...firstPost} />}
          </div>
          <div className='features__box'>
            {isLoading
              ? Array.from(new Array(4)).map((_, index) => {
                  return <FeatureCardSkeleton key={index} />;
                })
              : otherPosts?.map((post) => {
                  return <FeatureCard key={post.id} {...post} />;
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
