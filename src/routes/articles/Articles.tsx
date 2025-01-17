import PostLists from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './Articles.scss';

const Articles = () => {
  return (
    <div className='articles'>
      <div className='articles__container'>
        <AccountHeading title='My posts' subtitle='Stories written by me' />
        <PostLists posts={postItems} />
      </div>
    </div>
  );
};

export default Articles;
