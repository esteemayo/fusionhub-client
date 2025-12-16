import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import TopPost from '../topPost/TopPost';
import TopPostSkeleton from '../topPostSkeleton/TopPostSkeleton';

import { getTopPosts } from '../../services/postService';
import { TopPostsProps, TopPostsType } from '../../types';

import './TopPosts.scss';

const fetchTopPosts = async () => {
  const { data } = await getTopPosts();
  return data;
};

const TopPosts = ({ onClose }: TopPostsProps) => {
  const { isPending, error, data } = useQuery<TopPostsType | undefined>({
    queryKey: ['topPosts'],
    queryFn: fetchTopPosts,
  });

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <section
      className='top-posts'
      role='region'
      aria-labelledby='top-posts-heading'
    >
      <div className='top-posts__container'>
        <h2 id='top-posts-heading' className='top-posts__container--heading'>
          Top posts
        </h2>

        {isPending ? (
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
        ) : !hasData ? (
          <EmptyMessage
            title='No top posts available'
            subtitle='Currently, there are no top posts to display. Please check back later for the latest updates.'
            role='alert'
          />
        ) : (
          hasData && (
            <ul className='top-posts__list' role='list'>
              {data.map((post, index: number) => {
                return (
                  <li
                    key={post._id}
                    className='top-posts__list--item'
                    role='listitem'
                    aria-label={`Top post #${index + 1}: ${post.title}`}
                  >
                    <TopPost index={index} {...post} onClose={onClose} />
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
    </section>
  );
};

export default TopPosts;
