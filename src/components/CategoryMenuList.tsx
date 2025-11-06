import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import CategoryMenuListItem from './categoryMenuListItem/CategoryMenuListItem';

import { CategoryMenuListProps } from '../types';

const CategoryMenuList = ({ onRemove, onUpdate }: CategoryMenuListProps) => {
  return (
    <ContextMenuList>
      <CategoryMenuListItem label='Edit' onAction={onUpdate}>
        <EditIcon />
      </CategoryMenuListItem>
      <CategoryMenuListItem type='delete' label='Delete' onAction={onRemove}>
        <TrashIcon />
      </CategoryMenuListItem>
    </ContextMenuList>
  );
};

export default CategoryMenuList;
