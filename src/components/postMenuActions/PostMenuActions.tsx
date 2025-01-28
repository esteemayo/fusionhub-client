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
    return isOpen ? 'postMenuActions show' : 'postMenuActions hide';
  }, [isOpen]);

  return (
    <aside className={postMenuActionsClasses}>
      <div className='postMenuActions__container'>
        <Search />
        <Follow />
        <Categories />
        <Feeds />
        <Tags />
        <ActionMenus />
      </div>
    </aside>
  );
};

export default PostMenuActions;
