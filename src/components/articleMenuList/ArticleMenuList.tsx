import DeleteIcon from '../TrashIcon';
import EditIcon from '../EditIcon';
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
        <DeleteIcon />
      </ArticleMenuListItem>
    </ul>
  );
};

export default ArticleMenuList;
