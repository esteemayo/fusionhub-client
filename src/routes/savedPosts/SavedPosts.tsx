import EmptyPosts from '../../components/emptyPosts/EmptyPosts';
import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { useSavedPosts } from '../../hooks/useSavedPosts';

import './SavedPosts.scss';

const SavedPosts = () => {
  const { isPending, error, savedPosts } = useSavedPosts();

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
        {(savedPosts ?? [])?.length < 1 && !isPending ? (
          <EmptyPosts
            title='No saved posts yet'
            subtitle="You haven't saved any posts yet. Start exploring content and save posts you find interesting to view them here later."
          />
        ) : (
          <PostList isLoading={isPending} error={error} posts={savedPosts} />
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
