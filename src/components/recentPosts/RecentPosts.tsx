import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

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
  const { isPending, error, data } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: () => fetchRecentPosts(),
  });

  const boxClasses = useMemo(() => {
    return (data ?? [])?.length > 0 && !isPending && !error
      ? 'recent-posts__box show'
      : 'recent-posts__box hide';
  }, [data, error, isPending]);

  return (
    <section className='recent-posts'>
      <div className='recent-posts__container'>
        <h6 className='recent-posts__container--heading'>Recent articles</h6>
        {(data ?? [])?.length < 1 && !isPending ? (
          <div className='recent-posts__empty'>
            <span>No recent articles available.</span>
            <span>Check back later for the latest updates and posts.</span>
          </div>
        ) : (
          <div className={`recent-posts__wrapper ${error && 'error'}`}>
            {isPending ? (
              Array.from(Array(4)).map((_, index) => {
                return <RecentSkeleton key={index} />;
              })
            ) : error ? (
              <div className='recent-posts__error'>
                <span>Unable to load recent articles</span>
                <span>
                  {error.message ||
                    'There was an issue fetching the recent articles. Please try again later.'}
                </span>
              </div>
            ) : (
              data?.slice(0, 8).map((post: PostType) => {
                return <Card key={post._id} {...post} />;
              })
            )}
          </div>
        )}
        <div className={boxClasses}>
          <Link to='/posts' className='recent-posts__box--link'>
            Show more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
