import TopPosts from '../topPosts/TopPosts';
import Filter from '../filter/Filter';
import Categories from '../categories/Categories';
import Search from '../search/Search';

import './PostClient.scss';

const PostClient = () => {
  return (
    <div className='postClient'>
      <Search />
      <Filter />
      <Categories />
      <TopPosts />
    </div>
  );
};

export default PostClient;
