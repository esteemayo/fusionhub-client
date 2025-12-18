import { useMemo } from 'react';

import ArticleMenu from '../ArticleMenu';
import VerticalEllipsisIcon from '../icons/VerticalEllipsisIcon';

import { ArticleMenusProps } from '../../types';

import './ArticleMenus.scss';

const ArticleAction = ({
  currentUser,
  isAdmin,
  isOpen,
  isPostAuthor,
  postAuthorRole,
  onClose,
  onDelete,
  onToggle,
  onUpdate,
}: ArticleMenusProps) => {
  const articleClasses = useMemo(() => {
    if (!currentUser) {
      return 'article-menus hide';
    }

    if (isAdmin) {
      if (isPostAuthor) {
        return 'article-menus show';
      }

      if (postAuthorRole === 'admin') {
        return 'article-menus hide';
      }

      return 'article-menus show';
    }

    return 'article-menus hide';
  }, [currentUser, isAdmin, isPostAuthor, postAuthorRole]);

  return (
    <div className={articleClasses} aria-expanded={isOpen}>
      <button
        type='button'
        onClick={onToggle}
        className='article-menus__btn'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls='article-action-menu'
        aria-label='Open article action menu'
        title={`${isOpen ? 'Close' : 'Open'} menu`}
      >
        <VerticalEllipsisIcon />
      </button>

      <ArticleMenu
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default ArticleAction;
