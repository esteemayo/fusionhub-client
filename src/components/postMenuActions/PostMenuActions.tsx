import { useMemo } from 'react';

import Follow from '../follow/Follow';
import Tags from '../tags/Tags';
import Categories from '../categoryLists/CategoryLists';
import Feeds from '../feeds/Feeds';
import ActionMenus from '../actionMenus/ActionMenus';

import Search from '../../routes/postDetails/search/Search';

import { useAppDispatch } from '../../hooks/hooks';
import { onClose } from '../../features/postMenuActions/postMenuActionsSlice';

import { PostMenuActionsProps } from '../../types';

import './PostMenuActions.scss';

const PostMenuActions = ({ isOpen, post }: PostMenuActionsProps) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (isOpen) {
      dispatch(onClose());
    }
  };

  const postMenuActionsClasses = useMemo(() => {
    return isOpen ? 'post-menu-actions show' : 'post-menu-actions hide';
  }, [isOpen]);

  return (
    <aside className={postMenuActionsClasses}>
      <div className='post-menu-actions__container'>
        <Search onClose={handleClose} />
        <ActionMenus post={post} />
        <Categories onClose={handleClose} />
        <Feeds postId={post?._id} onClose={handleClose} />
        <Tags onClose={handleClose} />
        <Follow onClose={handleClose} />
      </div>
    </aside>
  );
};

export default PostMenuActions;
