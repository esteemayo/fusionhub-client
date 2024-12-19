import TopPosts from '../../components/topPosts/TopPosts';
import Filter from '../../components/filter/Filter';
import PostItems from '../../components/postItems/PostItems';
import Search from '../../components/search/Search';
import Categories from '../../components/categories/Categories';

import './Posts.scss';

const Posts = () => {
  return (
    <div className='posts'>
      <div className='posts__container'>
        <div className='posts__container--left'>
          <Search />
          <Filter />
          <Categories />
          <TopPosts />
        </div>
        <PostItems />
      </div>
    </div>
  );
};

export default Posts;
