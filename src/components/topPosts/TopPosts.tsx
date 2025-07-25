import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import TopPost from '../topPost/TopPost';
import TopPostSkeleton from '../topPostSkeleton/TopPostSkeleton';

import { TopPostsType } from '../../types';
import { getTopPosts } from '../../services/postService';

import './TopPosts.scss';

const fetchTopPosts = async () => {
  const { data } = await getTopPosts();
  return data;
};

const TopPosts = () => {
  const { isPending, error, data } = useQuery<TopPostsType[]>({
    queryKey: ['topPosts'],
    queryFn: fetchTopPosts,
  });

  return (
    <section className='top-posts'>
      <div className='top-posts__container'>
        <h2 className='top-posts__container--heading'>Top posts</h2>
        {(data ?? [])?.length < 1 && !isPending ? (
          <EmptyMessage
            title='No top posts available'
            subtitle='Currently, there are no top posts to display. Please check back later for the latest updates.'
          />
        ) : isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <TopPostSkeleton key={index} />;
          })
        ) : error ? (
          <EmptyMessage
            title='Unable to load top posts'
            subtitle={
              error.message ||
              'An error occurred while fetching the top posts. Please try again later or contact support if the issue persists.'
            }
          />
        ) : (
          data?.map((post, index: number) => {
            return <TopPost key={post._id} index={index} {...post} />;
          })
        )}
      </div>
    </section>
  );
};

export default TopPosts;
