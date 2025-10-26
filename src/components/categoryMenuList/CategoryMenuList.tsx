import TrashIcon from '../icons/TrashIcon';
import EditIcon from '../icons/EditIcon';
import CategoryMenuListItem from '../categoryMenuListItem/CategoryMenuListItem';

import { CategoryMenuListProps } from '../../types';

import './CategoryMenuList.scss';

const CategoryMenuList = ({ onRemove, onUpdate }: CategoryMenuListProps) => {
  return (
    <ul className='category-menu-list'>
      <CategoryMenuListItem label='Edit' onAction={onUpdate}>
        <EditIcon />
      </CategoryMenuListItem>
      <CategoryMenuListItem type='delete' label='Delete' onAction={onRemove}>
        <TrashIcon />
      </CategoryMenuListItem>
    </ul>
  );
};

export default CategoryMenuList;
