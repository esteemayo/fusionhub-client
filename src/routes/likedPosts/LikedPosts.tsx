import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './LikedPosts.scss';

const LikedPosts = () => {
  return (
    <div className='liked-posts'>
      <div className='liked-posts__container'>
        <AccountHeading
          title='Favorite posts'
          subtitle='My favorite stories/articles'
          type='profile'
        />
      </div>
      <div className='liked-posts__wrapper'>
        <PostList posts={postItems} />
      </div>
    </div>
  );
};

export default LikedPosts;
