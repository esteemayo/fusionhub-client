import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import ContextMenuListItem from './contextMenuListItem/ContextMenuListItem';

import { ArticleMenuListProps } from '../types';

const ArticleMenuList = ({ onDelete, onUpdate }: ArticleMenuListProps) => {
  return (
    <ContextMenuList>
      <ContextMenuListItem label='Edit' onAction={onUpdate}>
        <EditIcon />
      </ContextMenuListItem>
      <ContextMenuListItem type='danger' label='Delete' onAction={onDelete}>
        <TrashIcon />
      </ContextMenuListItem>
    </ContextMenuList>
  );
};

export default ArticleMenuList;
