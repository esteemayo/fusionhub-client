import { topPosts } from '../../data';
import TopPost from '../topPost/TopPost';

import './TopPosts.scss';

const TopPosts = () => {
  return (
    <aside className='topPosts'>
      <div className='topPosts__container'>
        <h2 className='topPosts__container--heading'>Top posts</h2>
        {topPosts.map((post) => {
          return <TopPost key={post.id} {...post} />;
        })}
      </div>
    </aside>
  );
};

export default TopPosts;
