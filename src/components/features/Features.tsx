import { useQuery } from '@tanstack/react-query';

import ErrorState from '../errorState/ErrorState';
import Feature from '../feature/Feature';
import FeatureCard from '../featureCard/FeatureCard';

import FeatureSkeleton from '../featureSkeleton/FeatureSkeleton';
import FeatureCardSkeleton from '../featureCardSkeleton/FeatureCardSkeleton';

import { PostType } from '../../types';
import { getFeaturedPosts } from '../../services/postService';

import './Features.scss';

const fetchFeaturedPosts = async () => {
  const { data } = await getFeaturedPosts();
  return data;
};

const Features = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () => fetchFeaturedPosts(),
  });

  console.log(data);

  const [firstPost, ...otherPosts] = data && data;

  return (
    <section className='features'>
      <div className='features__container'>
        <h3 className='features__container--heading'>Featured articles</h3>
        <div className='features__wrapper'>
          <div className='features__wrap'>
            {isPending ? (
              <FeatureSkeleton />
            ) : error ? (
              <ErrorState
                title='Something went wrong!'
                subtitle={error.message}
                imgSrc='/book-writer.svg'
              />
            ) : (
              <Feature {...firstPost} />
            )}
          </div>
          <div className='features__box'>
            {isPending ? (
              Array.from(new Array(4)).map((_, index) => {
                return <FeatureCardSkeleton key={index} />;
              })
            ) : error ? (
              <ErrorState
                title='Something went wrong!'
                subtitle={error.message}
                imgSrc='/book-writer.svg'
              />
            ) : (
              otherPosts?.map((post: PostType) => {
                return <FeatureCard key={post._id} {...post} />;
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
