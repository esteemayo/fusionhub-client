import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import ErrorState from '../errorState/ErrorState';
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
    return !isPending ? 'recent-posts__box show' : 'recent-posts__box hide';
  }, [isPending]);

  if (data?.length < 1) {
    return (
      <section className='recent-posts'>
        <div className='recent-posts__container'>
          <ErrorState
            title='No recent articles available'
            subtitle='It seems there are no recent articles to display at the moment. Please check back later for the latest updates.'
          />
        </div>
      </section>
    );
  }

  return (
    <section className='recent-posts'>
      <div className='recent-posts__container'>
        <h6 className='recent-posts__container--heading'>Recent articles</h6>
        <div className='recent-posts__wrapper'>
          {isPending ? (
            Array.from(Array(4)).map((_, index) => {
              return <RecentSkeleton key={index} />;
            })
          ) : error ? (
            <ErrorState
              title='Unable to load recent articles'
              subtitle='There was an issue fetching the recent articles. Please try again later.'
            />
          ) : (
            data?.slice(0, 8).map((post: PostType) => {
              return <Card key={post._id} {...post} />;
            })
          )}
        </div>
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
