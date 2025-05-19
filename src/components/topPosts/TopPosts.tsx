import { useQuery } from '@tanstack/react-query';

import ErrorState from '../errorState/ErrorState';
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
  const { isPending, error, data } = useQuery({
    queryKey: ['topPosts'],
    queryFn: () => fetchTopPosts(),
  });

  if (data?.length < 1) {
    return (
      <section className='top-posts'>
        <div className='top-posts__container'>
          <h2 className='top-posts__container--heading'>Top posts</h2>
          <ErrorState
            title='No top posts available'
            subtitle='Currently, there are no top posts to display. Please check back later for the latest updates.'
          />
        </div>
      </section>
    );
  }

  return (
    <section className='top-posts'>
      <div className='top-posts__container'>
        <h2 className='top-posts__container--heading'>Top posts</h2>
        {isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <TopPostSkeleton key={index} />;
          })
        ) : error ? (
          <ErrorState title='' subtitle='' />
        ) : (
          data?.map((post: PostType, index: number) => {
            return <TopPost key={post._id} index={index} {...post} />;
          })
        )}
      </div>
    </section>
  );
};

export default TopPosts;
