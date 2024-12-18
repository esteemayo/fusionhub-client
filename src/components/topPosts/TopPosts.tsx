import TopPost from '../topPost/TopPost';

import './TopPosts.scss';

const TopPosts = () => {
  return (
    <aside className='topPosts'>
      <div className='topPosts__container'>
        <h2 className='topPosts__container--heading'>Top posts</h2>
        <TopPost />
        <TopPost />
        <TopPost />
        <TopPost />
        <TopPost />
      </div>
    </aside>
  );
};

export default TopPosts;
