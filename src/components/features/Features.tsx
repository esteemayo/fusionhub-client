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

  const noData = (data ?? []).length < 1;

  return (
    <section
      className='features'
      role='region'
      aria-labelledby='featured-articles-heading'
      aria-busy={isPending}
    >
      <div className='features__container'>
        <h3
          id='featured-articles-heading'
          className='features__container--heading'
        >
          Featured articles
        </h3>

        {error ? (
          <EmptyMessage
            title='Unable to Load Featured Articles'
            subtitle={
              error.message ||
              'We encountered an issue while trying to load the featured articles. Please check your internet connection or try refreshing the page. If the problem persists, feel free to contact our support team for assistance.'
            }
            center
            role='alert'
          />
        ) : noData && !isPending ? (
          <EmptyMessage
            title="Oops! It seems we don't have any featured articles to display right now."
            subtitle="Don't worry, we're constantly updating our content. Please check back soon for the latest featured articles, or explore other sections of our blog to discover more interesting reads."
            center
            role='status'
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

            <ul className='features__box' role='list'>
              {isPending
                ? Array.from(new Array(4)).map((_, index) => {
                    return (
                      <li key={index} role='listitem'>
                        <FeatureCardSkeleton />
                      </li>
                    );
                  })
                : otherPosts?.map((post) => {
                    return (
                      <li key={post._id} role='listitem'>
                        <FeatureCard
                          {...post}
                          comments={
                            Array.isArray(post.comments) ? post.comments : []
                          }
                        />
                      </li>
                    );
                  })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
