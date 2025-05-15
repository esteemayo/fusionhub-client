import { useQuery } from '@tanstack/react-query';

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

  if (error) {
    return <span>Something went wrong! {error.message}</span>;
  }

  return (
    <div className='saved-posts'>
      <div className='saved-posts__container'>
        <AccountHeading
          title='Saved posts'
          subtitle='My saved stories/articles'
          type='profile'
        />
      </div>
      {data?.length < 1 ? (
        <span>There are no posts to display now...</span>
      ) : (
        <div className='saved-posts__wrapper'>
          <PostList posts={data} isLoading={isPending} />
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
