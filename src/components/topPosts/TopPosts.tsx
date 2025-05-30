import { useQuery } from '@tanstack/react-query';

import TopPost from '../topPost/TopPost';
import TopPostSkeleton from '../topPostSkeleton/TopPostSkeleton';

import { PostType } from '../../types';
import { getTopPosts } from '../../services/postService';

import './TopPosts.scss';

const fetchTopPosts = async () => {
  const { data } = await getTopPosts();
  return data;
};

const TopPosts = () => {
  const { isPending, error, data } = useQuery<PostType[]>({
    queryKey: ['topPosts'],
    queryFn: () => fetchTopPosts(),
  });

  return (
    <section className='top-posts'>
      <div className='top-posts__container'>
        <h2 className='top-posts__container--heading'>Top posts</h2>
        {(data ?? [])?.length < 1 ? (
          <div className='top-posts__empty'>
            <span>No top posts available</span>
            <span>
              Currently, there are no top posts to display. Please check back
              later for the latest updates.
            </span>
          </div>
        ) : isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <TopPostSkeleton key={index} />;
          })
        ) : error ? (
          <div className='top-posts__error'>
            <span>Unable to load top posts</span>
            <span>
              {error.message ||
                'An error occurred while fetching the top posts. Please try again later or contact support if the issue persists.'}
            </span>
          </div>
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
