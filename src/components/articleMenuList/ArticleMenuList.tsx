import TrashIcon from '../icons/TrashIcon';
import EditIcon from '../icons/EditIcon';
import ArticleMenuListItem from '../articleMenuListItem/ArticleMenuListItem';

import { ArticleMenuListProps } from '../../types';

import './ArticleMenuList.scss';

const ArticleMenuList = ({ onDelete, onUpdate }: ArticleMenuListProps) => {
  return (
    <ul className='article-menu-list'>
      <ArticleMenuListItem label='Edit' onClick={onUpdate}>
        <EditIcon />
      </ArticleMenuListItem>
      <ArticleMenuListItem type='delete' label='Delete' onClick={onDelete}>
        <TrashIcon />
      </ArticleMenuListItem>
    </ul>
  );
};

export default ArticleMenuList;
