import { useMemo } from 'react';

import MostRead from '../mostRead/MostRead';
import Filter from '../filter/Filter';
import TopPosts from '../topPosts/TopPosts';
import Search from '../search/Search';
import Categories from '../categoryLists/CategoryLists';

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
        <MostRead />
      </div>
    </aside>
  );
};

export default PostClient;
