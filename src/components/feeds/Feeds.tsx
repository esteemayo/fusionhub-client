import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Feed from '../feed/Feed';
import FeedSkeleton from '../feedSkeleton/FeedSkeleton';

import { FeedsProps, FeedType } from '../../types';
import { getTrendingPosts } from '../../services/postService';

import './Feeds.scss';

const fetchTrendingPosts = async () => {
  const { data } = await getTrendingPosts();
  return data;
};

const Feeds = ({ postId, onClose }: FeedsProps) => {
  const { isPending, error, data } = useQuery<FeedType | undefined>({
    queryKey: ['trends'],
    queryFn: fetchTrendingPosts,
  });

  const hasData = Array.isArray(data) ?? (data ?? []).length > 0;

  return (
    <section
      className='feeds'
      role='region'
      aria-labelledby='feeds-heading'
      aria-busy={isPending}
    >
      <div className='feeds__container'>
        <h2
          id='feeds-heading'
          className='feeds__container--heading'
          tabIndex={-1}
        >
          Feeds
        </h2>

        <ul className='feeds__list' role='list'>
          {isPending ? (
            Array.from(Array(3)).map((_, index) => {
              return (
                <li key={index} role='listitem'>
                  <FeedSkeleton key={index} />
                </li>
              );
            })
          ) : error ? (
            <EmptyMessage
              title='Oops! We encountered an issue while loading the trending posts.'
              subtitle={
                error.message ||
                'Please try refreshing the page or check your internet connection.'
              }
              role='alert'
            />
          ) : !hasData ? (
            <EmptyMessage
              title='No trending posts available at the moment.'
              subtitle='Check back later or explore other sections!'
              role='status'
            />
          ) : (
            hasData &&
            data
              ?.filter((item) => item._id !== postId)
              .map((feed) => {
                return (
                  <li key={feed._id} role='listitem'>
                    <Feed {...feed} onClose={onClose} />
                  </li>
                );
              })
          )}
        </ul>
      </div>
    </section>
  );
};

export default Feeds;
