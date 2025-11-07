import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import ContextMenuListItem from './contextMenuListItem/ContextMenuListItem';

import { CategoryMenuListProps } from '../types';

const CategoryMenuList = ({ onRemove, onUpdate }: CategoryMenuListProps) => {
  return (
    <ContextMenuList>
      <ContextMenuListItem label='Edit' onAction={onUpdate}>
        <EditIcon />
      </ContextMenuListItem>
      <ContextMenuListItem type='danger' label='Delete' onAction={onRemove}>
        <TrashIcon />
      </ContextMenuListItem>
    </ContextMenuList>
  );
};

export default CategoryMenuList;
