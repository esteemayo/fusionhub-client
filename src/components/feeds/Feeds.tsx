import { useQuery } from '@tanstack/react-query';

import Feed from '../feed/Feed';
import FeedSkeleton from '../feedSkeleton/FeedSkeleton';

import { PostType } from '../../types';
import { getTrendingPosts } from '../../services/postService';

import './Feeds.scss';

const fetchTrendingPosts = async () => {
  const { data } = await getTrendingPosts();
  return data;
};

const Feeds = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['trends'],
    queryFn: () => fetchTrendingPosts(),
  });

  return (
    <section className='feeds'>
      <div className='feeds__container'>
        <h2 className='feeds__container-heading'>Feeds</h2>
        {data?.length < 1 ? (
          <span>empty feeds</span>
        ) : isPending ? (
          Array.from(Array(3)).map((_, index) => {
            return <FeedSkeleton key={index} />;
          })
        ) : error ? (
          <div>
            <p>Something went wrong!</p>
            <span>{error.message}</span>
          </div>
        ) : (
          data.map((feed: PostType) => {
            return <Feed key={feed._id} {...feed} />;
          })
        )}
      </div>
    </section>
  );
};

export default Feeds;
