import PostLists from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './SavedPosts.scss';

const SavedPosts = () => {
  return (
    <div className='savedPosts'>
      <div className='savedPosts__container'>
        <AccountHeading
          title='Saved posts'
          subtitle='My saved stories/articles'
        />
        <PostLists posts={postItems} />
      </div>
    </div>
  );
};

export default SavedPosts;
