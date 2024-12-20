import PostItems from '../../components/postItems/PostItems';
import Postbar from '../../components/postbar/Postbar';
import PostClient from '../../components/postClient/PostClient';

import './Posts.scss';

const Posts = () => {
  return (
    <div className='posts'>
      <div className='posts__container'>
        <Postbar />
        <div className='posts__wrapper'>
          <div className='posts__box'>
            <PostClient />
            <PostItems />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
