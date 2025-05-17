import { useQuery } from '@tanstack/react-query';

import EmptyPosts from '../../components/emptyPosts/EmptyPosts';
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
      <div className='articles__wrapper'>
        {data?.length < 1 ? (
          <EmptyPosts
            title='No posts yet'
            subtitle="It looks like you haven't written any posts yet. Start sharing your stories with the world!"
          />
        ) : (
          <PostList isLoading={isPending} error={error} posts={data} />
        )}
      </div>
    </div>
  );
};

export default Articles;
