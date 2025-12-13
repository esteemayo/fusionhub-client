import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Card from '../card/Card';
import RecentSkeleton from '../recentSkeleton/RecentSkeleton';

import { PostType } from '../../types';
import { getRecentPosts } from '../../services/postService';

import './RecentPosts.scss';

const fetchRecentPosts = async () => {
  const { data } = await getRecentPosts();
  return data;
};

const RecentPosts = () => {
  const { isPending, error, data } = useQuery<PostType[] | undefined>({
    queryKey: ['recentPosts'],
    queryFn: fetchRecentPosts,
  });

  const hasData = Array.isArray(data) ?? (data ?? []).length > 0;

  const wrapperClasses = useMemo(
    () => `recent-posts__wrapper ${error || !hasData ? 'center' : ''}`,
    [error, hasData]
  );

  const boxClasses = useMemo(
    () =>
      (data ?? [])?.length > 0 && !isPending && !error
        ? 'recent-posts__box show'
        : 'recent-posts__box hide',
    [data, error, isPending]
  );

  return (
    <section
      className='recent-posts'
      aria-labelledby='recent-posts-heading'
      aria-busy={isPending}
    >
      <div className='recent-posts__container'>
        <h6
          id='recent-posts-heading'
          className='recent-posts__container--heading'
        >
          Recent articles
        </h6>

        {
          <ul
            className={wrapperClasses}
            role='list'
            aria-live='polite'
            aria-label='Recent articles list'
          >
            {isPending ? (
              <>
                <span className='sr-only'>Loading recent articles</span>
                {Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <li key={index} role='listitem'>
                      <RecentSkeleton />
                    </li>
                  );
                })}
              </>
            ) : error ? (
              <EmptyMessage
                title='Unable to load recent articles'
                subtitle={
                  error.message ||
                  'There was an issue fetching the recent articles. Please try again later.'
                }
                center
              />
            ) : !hasData ? (
              <EmptyMessage
                title='No recent articles available.'
                subtitle='Check back later for the latest updates and posts.'
                center
              />
            ) : (
              hasData &&
              data?.slice(0, 8).map((post) => {
                return (
                  <li key={post._id} role='listitem'>
                    <Card {...post} />
                  </li>
                );
              })
            )}
          </ul>
        }

        <div className={boxClasses}>
          <Link
            to='/posts'
            className='recent-posts__box--link'
            aria-label='View all articles'
          >
            Show more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
