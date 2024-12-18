import TopPosts from '../../components/topPosts/TopPosts';
import Search from '../../components/search/Search';
import Categories from '../../components/categories/Categories';

import './Posts.scss';

const Posts = () => {
  return (
    <div className='posts'>
      <div className='posts__container'>
        <div className='posts__container--left'>
          <Search />
          <Categories />
          <TopPosts />
        </div>
        <div className='posts__container--right'>Posts Right</div>
      </div>
    </div>
  );
};

export default Posts;
