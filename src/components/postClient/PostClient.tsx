import { useMemo } from 'react';

import TopPosts from '../topPosts/TopPosts';
import Filter from '../filter/Filter';
import Categories from '../categories/Categories';
import Search from '../search/Search';

import './PostClient.scss';

const PostClient = ({ isOpen }: { isOpen: boolean }) => {
  const postClientClasses = useMemo(() => {
    return isOpen ? 'post-client show' : 'post-client hide';
  }, [isOpen]);

  return (
    <aside className={postClientClasses}>
      <div className='post-client__container'>
        <Search />
        <Filter />
        <Categories />
        <TopPosts />
      </div>
    </aside>
  );
};

export default PostClient;
