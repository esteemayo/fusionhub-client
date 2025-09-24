import ArticleMenuListItem from '../articleMenuListItem/ArticleMenuListItem';

import { ArticleMenuListProps } from '../../types';

import './ArticleMenuList.scss';

const ArticleMenuList = ({ onDelete, onUpdate }: ArticleMenuListProps) => {
  return (
    <ul className='article-menu-list'>
      <ArticleMenuListItem label='Edit' onClick={onUpdate} />
      <ArticleMenuListItem label='Delete' onClick={onDelete} />
    </ul>
  );
};

export default ArticleMenuList;
