import { useMemo } from 'react';

import ArticleMenuList from '../articleMenuList/ArticleMenuList';

import { ArticleMenuProps } from '../../types';

import './ArticleMenu.scss';

const ArticleMenu = ({ isOpen, onDelete, onUpdate }: ArticleMenuProps) => {
  const articleMenuClasses = useMemo(() => {
    return isOpen ? 'article-menu show' : 'article-menu hide';
  }, [isOpen]);

  return (
    <aside className={articleMenuClasses}>
      <ArticleMenuList onDelete={onDelete} onUpdate={onUpdate} />
    </aside>
  );
};

export default ArticleMenu;
