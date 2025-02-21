import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './DislikedPosts.scss';

const DislikedPosts = () => {
  return (
    <div className='disliked-posts'>
      <div className='disliked-posts__container'>
        <AccountHeading
          title='Least favorite posts'
          subtitle='My least liked stories/articles'
          type='profile'
        />
      </div>
      <div className='disliked-posts__wrapper'>
        <PostList posts={postItems} />
      </div>
    </div>
  );
};

export default DislikedPosts;
