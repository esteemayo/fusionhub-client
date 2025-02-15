import Feature from '../feature/Feature';
import FeatureCard from '../featureCard/FeatureCard';

import { postItems } from '../../data';

import './Features.scss';

const Features = () => {
  const featuredPosts = postItems.filter((post) => post.isFeatured === true);
  console.log(featuredPosts);

  const [firstPost, ...otherPosts] = featuredPosts;
  console.log(firstPost);
  console.log(otherPosts);

  return (
    <section className='features'>
      <div className='features__container'>
        <h3 className='features__container--heading'>Featured articles</h3>
        <div className='features__wrapper'>
          <div className='features__wrap'>
            <Feature {...firstPost} />
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
