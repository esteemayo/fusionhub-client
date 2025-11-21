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
    <div className={articleClasses}>
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className='article-menus__btn'
      >
        <VerticalEllipsisIcon />
      </button>
      <ArticleMenu isOpen={isOpen} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
};

export default ArticleAction;
