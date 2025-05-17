import { useQuery } from '@tanstack/react-query';

import EmptyPosts from '../../components/emptyPosts/EmptyPosts';
import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { getSavedPosts } from '../../services/userService';

import './SavedPosts.scss';

const fetchSavedPosts = async () => {
  const { data } = await getSavedPosts();
  return data;
};

const SavedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['savedPosts'],
    queryFn: () => fetchSavedPosts(),
  });

  return (
    <div className='saved-posts'>
      <div className='saved-posts__container'>
        <AccountHeading
          title='Saved posts'
          subtitle='My saved stories/articles'
          type='profile'
        />
      </div>
      <div className='saved-posts__wrapper'>
        {data?.length < 1 ? (
          <EmptyPosts
            title='No saved posts yet'
            subtitle="You haven't saved any posts yet. Start exploring content and save posts you find interesting to view them here later."
          />
        ) : (
          <PostList isLoading={isPending} error={error} posts={data} />
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
