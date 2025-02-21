import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './SavedPosts.scss';

const SavedPosts = () => {
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
        <PostList posts={postItems} />
      </div>
    </div>
  );
};

export default SavedPosts;
