import { useMemo } from 'react';

import TopPosts from '../topPosts/TopPosts';
import Filter from '../filter/Filter';
import Categories from '../categories/Categories';
import Search from '../search/Search';

import { PostClientProps } from '../../types';

import './PostClient.scss';

const PostClient = ({ isOpen, ref }: PostClientProps) => {
  const postClientClasses = useMemo(() => {
    return isOpen ? 'post-client show' : 'post-client hide';
  }, [isOpen]);

  return (
    <aside className={postClientClasses}>
      <div className='post-client__container'>
        <Search ref={ref} />
        <Filter />
        <Categories />
        <TopPosts />
      </div>
    </aside>
  );
};

export default PostClient;
