import PostLists from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './DislikedPosts.scss';

const DislikedPosts = () => {
  return (
    <div className='dislikedPosts'>
      <div className='dislikedPosts__container'>
        <AccountHeading
          title='Least favorite posts'
          subtitle='My least liked stories/articles'
        />
        <PostLists posts={postItems} />
      </div>
    </div>
  );
};

export default DislikedPosts;
