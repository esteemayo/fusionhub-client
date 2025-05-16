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
        <div className='articles__empty'>
          <h2>No Posts Yet</h2>
          <p>
            It looks like you haven't written any posts yet. Start sharing your
            stories with the world!
          </p>
        </div>
      ) : (
        <div className='articles__wrapper'>
          <PostList isLoading={isPending} error={error} posts={data} />
        </div>
      )}
    </div>
  );
};

export default Articles;
