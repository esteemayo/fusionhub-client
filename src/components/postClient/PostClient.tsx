import { useCallback, useEffect, useMemo, useRef } from 'react';

import MostRead from '../mostRead/MostRead';
import Filter from '../filter/Filter';
import TopPosts from '../topPosts/TopPosts';
import Search from '../search/Search';
import CategoryLists from '../categoryLists/CategoryLists';

import { useAppDispatch } from '../../hooks/hooks';
import { onClose } from '../../features/postsMenu/postsMenuSlice';

import { PostClientProps } from '../../types';

import './PostClient.scss';

const PostClient = ({ isOpen, inputRef, onFocus }: PostClientProps) => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (isOpen) {
      dispatch(onClose());
    }
  }, [dispatch, isOpen]);

  const postClientClasses = useMemo(
    () => (isOpen ? 'post-client show' : 'post-client hide'),
    [isOpen]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        onFocus();
        containerRef.current?.focus();
      }, 50);

      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleClose, isOpen, onFocus]);

  return (
    <aside
      id='post-client-sidebar'
      className={postClientClasses}
      role='complementary'
      aria-label='Posts filter and navigation sidebar'
      aria-hidden={!isOpen}
      tabIndex={isOpen ? -1 : undefined}
    >
      <div ref={containerRef} className='post-client__container'>
        <Search inputRef={inputRef} />
        <Filter onClose={handleClose} />
        <CategoryLists onClose={handleClose} />
        <TopPosts onClose={handleClose} />
        <MostRead onClose={handleClose} />
      </div>
    </aside>
  );
};

export default PostClient;
