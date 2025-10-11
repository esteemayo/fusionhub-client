import { useMemo } from 'react';

import ArticleMenu from '../articleMenu/ArticleMenu';

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
        aria-label={isOpen ? 'Open menu' : 'Close menu'}
        className='article-menus__btn'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='size-6'
        >
          <path
            fillRule='evenodd'
            d='M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <ArticleMenu isOpen={isOpen} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
};

export default ArticleAction;
