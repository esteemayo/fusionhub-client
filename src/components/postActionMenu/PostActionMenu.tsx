import { useMemo } from 'react';

import Follow from '../../components/follow/Follow';
import Tags from '../../components/tags/Tags';
import Categories from '../../components/categories/Categories';
import Feeds from '../../components/feeds/Feeds';

import Search from '../../routes/postDetails/search/Search';

import './PostActionMenu.scss';

const PostActionMenu = ({ isOpen }: { isOpen: boolean }) => {
  const postActionMenuClasses = useMemo(() => {
    return isOpen ? 'postActionMenu show' : 'postActionMenu hide';
  }, [isOpen]);

  return (
    <aside className={postActionMenuClasses}>
      <div className='postActionMenu__container'>
        <Search />
        <Follow />
        <Categories />
        <Feeds />
        <Tags />
      </div>
    </aside>
  );
};

export default PostActionMenu;
