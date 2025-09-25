import { useMemo } from 'react';

import CategoryMenuList from '../categoryMenuList/CategoryMenuList';

import { CategoryMenuProps } from '../../types';

import './CategoryMenu.scss';

const CategoryMenu = ({ isOpen, onRemove, onUpdate }: CategoryMenuProps) => {
  const categoryMenuClasses = useMemo(() => {
    return isOpen ? 'category-menu show' : 'category-menu hide';
  }, [isOpen]);

  return (
    <aside className={categoryMenuClasses}>
      <CategoryMenuList onRemove={onRemove} onUpdate={onUpdate} />
    </aside>
  );
};

export default CategoryMenu;
