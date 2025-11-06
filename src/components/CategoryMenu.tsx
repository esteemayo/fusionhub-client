import ContextMenu from './contextMenu/ContextMenu';
import CategoryMenuList from './CategoryMenuList';

import { CategoryMenuProps } from '../types';

const CategoryMenu = ({ isOpen, onRemove, onUpdate }: CategoryMenuProps) => {
  return (
    <ContextMenu isOpen={isOpen}>
      <CategoryMenuList onRemove={onRemove} onUpdate={onUpdate} />
    </ContextMenu>
  );
};

export default CategoryMenu;
