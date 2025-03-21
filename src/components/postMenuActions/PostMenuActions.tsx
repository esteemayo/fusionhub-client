import { useMemo } from 'react';

import Follow from '../follow/Follow';
import Tags from '../tags/Tags';
import Categories from '../categories/Categories';
import Feeds from '../feeds/Feeds';
import ActionMenus from '../actionMenus/ActionMenus';

import Search from '../../routes/postDetails/search/Search';

import './PostMenuActions.scss';

const PostMenuActions = ({ isOpen }: { isOpen: boolean }) => {
  const postMenuActionsClasses = useMemo(() => {
    return isOpen ? 'post-menu-actions show' : 'post-menu-actions hide';
  }, [isOpen]);

  return (
    <aside className={postMenuActionsClasses}>
      <div className='post-menu-actions__container'>
        <Search />
        <ActionMenus />
        <Categories />
        <Feeds />
        <Tags />
        <Follow />
      </div>
    </aside>
  );
};

export default PostMenuActions;
