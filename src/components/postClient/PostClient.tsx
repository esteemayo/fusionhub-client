import { useMemo } from 'react';

import MostRead from '../mostRead/MostRead';
import Filter from '../filter/Filter';
import TopPosts from '../topPosts/TopPosts';
import Search from '../search/Search';
import CategoryLists from '../categoryLists/CategoryLists';

import { useAppDispatch } from '../../hooks/hooks';
import { onClose } from '../../features/postsMenu/postsMenuSlice';

import { PostClientProps } from '../../types';

import './PostClient.scss';

const PostClient = ({ isOpen, ref }: PostClientProps) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (isOpen) {
      dispatch(onClose());
    }
  };

  const postClientClasses = useMemo(
    () => (isOpen ? 'post-client show' : 'post-client hide'),
    [isOpen]
  );

  return (
    <aside className={postClientClasses}>
      <div className='post-client__container'>
        <Search ref={ref} />
        <Filter onClose={handleClose} />
        <CategoryLists onClose={handleClose} />
        <TopPosts onClose={handleClose} />
        <MostRead onClose={handleClose} />
      </div>
    </aside>
  );
};

export default PostClient;
