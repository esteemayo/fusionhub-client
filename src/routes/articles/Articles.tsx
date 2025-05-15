import { useQuery } from '@tanstack/react-query';

import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { getUserPosts } from '../../services/postService';

import './Articles.scss';

const fetchUserPosts = async () => {
  const { data } = await getUserPosts();
  return data;
};

const Articles = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['userPosts'],
    queryFn: () => fetchUserPosts(),
  });

  if (error) {
    return <span>Something went wrong! {error.message}</span>;
  }

  return (
    <div className='articles'>
      <div className='articles__container'>
        <AccountHeading
          title='My posts'
          subtitle='Stories written by me'
          type='profile'
        />
      </div>
      {data?.length < 1 ? (
        <span>There are no posts to display now...</span>
      ) : (
        <div className='articles__wrapper'>
          <PostList posts={data} isLoading={isPending} />
        </div>
      )}
    </div>
  );
};

export default Articles;
