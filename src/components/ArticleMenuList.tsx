import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import ArticleMenuListItem from './articleMenuListItem/ArticleMenuListItem';

import { ArticleMenuListProps } from '../types';

const ArticleMenuList = ({ onDelete, onUpdate }: ArticleMenuListProps) => {
  return (
    <ContextMenuList>
      <ArticleMenuListItem label='Edit' onClick={onUpdate}>
        <EditIcon />
      </ArticleMenuListItem>
      <ArticleMenuListItem type='delete' label='Delete' onClick={onDelete}>
        <TrashIcon />
      </ArticleMenuListItem>
    </ContextMenuList>
  );
};

export default ArticleMenuList;
