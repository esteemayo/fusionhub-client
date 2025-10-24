import DeleteIcon from '../TrashIcon';
import EditIcon from '../EditIcon';
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
        <DeleteIcon />
      </CategoryMenuListItem>
    </ul>
  );
};

export default CategoryMenuList;
