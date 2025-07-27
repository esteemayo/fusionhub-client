import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Feed from '../feed/Feed';
import FeedSkeleton from '../feedSkeleton/FeedSkeleton';

import { FeedType } from '../../types';
import { getTrendingPosts } from '../../services/postService';

import './Feeds.scss';

const fetchTrendingPosts = async () => {
  const { data } = await getTrendingPosts();
  return data;
};

const Feeds = ({ postId }: { postId: string }) => {
  const { isPending, error, data } = useQuery<FeedType | undefined>({
    queryKey: ['trends'],
    queryFn: fetchTrendingPosts,
  });

  return (
    <section className='feeds'>
      <div className='feeds__container'>
        <h2 className='feeds__container-heading'>Feeds</h2>
        {(data ?? []).length < 1 && !isPending ? (
          <EmptyMessage
            title='No trending posts available at the moment.'
            subtitle='Check back later or explore other sections!'
          />
        ) : isPending ? (
          Array.from(Array(3)).map((_, index) => {
            return <FeedSkeleton key={index} />;
          })
        ) : error ? (
          <EmptyMessage
            title='Oops! We encountered an issue while loading the trending posts.'
            subtitle={
              error.message ||
              'Please try refreshing the page or check your internet connection.'
            }
          />
        ) : (
          data
            ?.filter((item) => item._id !== postId)
            .map((feed) => {
              return <Feed key={feed._id} {...feed} />;
            })
        )}
      </div>
    </section>
  );
};

export default Feeds;
