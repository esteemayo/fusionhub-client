import { useQuery } from '@tanstack/react-query';

import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { getLikedPosts } from '../../services/postService';

import './LikedPosts.scss';

const fetchLikedPosts = async () => {
  const { data } = await getLikedPosts();
  return data;
};

const LikedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['likedPosts'],
    queryFn: () => fetchLikedPosts(),
  });

  if (error) {
    return <span>Something went wrong! {error.message}</span>;
  }

  return (
    <div className='liked-posts'>
      <div className='liked-posts__container'>
        <AccountHeading
          title='Favorite posts'
          subtitle='My favorite stories/articles'
          type='profile'
        />
      </div>
      {data?.length < 1 ? (
        <span>There are no posts to display now...</span>
      ) : (
        <div className='liked-posts__wrapper'>
          <PostList posts={data} isLoading={isPending} />
        </div>
      )}
    </div>
  );
};

export default LikedPosts;
