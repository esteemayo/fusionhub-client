import PostLists from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './LikedPosts.scss';

const LikedPosts = () => {
  return (
    <div className='likedPosts'>
      <div className='likedPosts__container'>
        <AccountHeading
          title='Favorite posts'
          subtitle='My favorite stories/articles'
        />
        <PostLists posts={postItems} />
      </div>
    </div>
  );
};

export default LikedPosts;
