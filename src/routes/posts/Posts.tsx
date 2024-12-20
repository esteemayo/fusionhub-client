import PostItems from '../../components/postItems/PostItems';
import PostClient from '../../components/postClient/PostClient';

import './Posts.scss';

const Posts = () => {
  return (
    <div className='posts'>
      <div className='posts__container'>
        <PostClient />
        <PostItems />
      </div>
    </div>
  );
};

export default Posts;
