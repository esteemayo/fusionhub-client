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

  const [firstPost, ...otherPosts] = data ? data : [];

  if (data?.length < 1) {
    return (
      <section className='features'>
        <div className='features__container'>
          <ErrorState
            title='No featured posts available'
            subtitle='Currently, there are no featured articles to display. Please check back later for updates.'
          />
        </div>
      </section>
    );
  }

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
              <Feature
                {...firstPost}
                comments={
                  Array.isArray(firstPost.comments) ? firstPost.comments : []
                }
              />
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
                return (
                  <FeatureCard
                    key={post._id}
                    {...post}
                    comments={Array.isArray(post.comments) ? post.comments : []}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
