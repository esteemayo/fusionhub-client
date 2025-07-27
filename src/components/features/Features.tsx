import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import FeatureCard from '../featureCard/FeatureCard';
import Feature from '../feature/Feature';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import FeatureSkeleton from '../featureSkeleton/FeatureSkeleton';
import FeatureCardSkeleton from '../featureCardSkeleton/FeatureCardSkeleton';

import { FeatureType } from '../../types';
import { getFeaturedPosts } from '../../services/postService';

import './Features.scss';

const fetchFeaturedPosts = async () => {
  const { data } = await getFeaturedPosts();
  return data;
};

const Features = () => {
  const { isPending, error, data } = useQuery<FeatureType | undefined>({
    queryKey: ['featuredPosts'],
    queryFn: fetchFeaturedPosts,
  });

  const [firstPost, ...otherPosts] = useMemo(() => (data ? data : []), [data]);

  return (
    <section className='features'>
      <div className='features__container'>
        <h3 className='features__container--heading'>Featured articles</h3>
        {(data ?? [])?.length < 1 && !isPending ? (
          <EmptyMessage
            title="Oops! It seems we don't have any featured articles to display right now."
            subtitle="Don't worry, we're constantly updating our content. Please check back soon for the latest featured articles, or explore other sections of our blog to discover more interesting reads."
            center
          />
        ) : error ? (
          <EmptyMessage
            title='Unable to Load Featured Articles'
            subtitle={
              error.message ||
              'We encountered an issue while trying to load the featured articles. Please check your internet connection or try refreshing the page. If the problem persists, feel free to contact our support team for assistance.'
            }
            center
          />
        ) : (
          <div className='features__wrapper'>
            <div className='features__wrap'>
              {isPending ? (
                <FeatureSkeleton />
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
              {isPending
                ? Array.from(new Array(4)).map((_, index) => {
                    return <FeatureCardSkeleton key={index} />;
                  })
                : otherPosts?.map((post) => {
                    return (
                      <FeatureCard
                        key={post._id}
                        {...post}
                        comments={
                          Array.isArray(post.comments) ? post.comments : []
                        }
                      />
                    );
                  })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
