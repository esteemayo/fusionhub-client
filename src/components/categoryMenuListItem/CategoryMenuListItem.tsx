import { useMemo } from 'react';

import { CategoryMenuListItemProps } from '../../types';

import './CategoryMenuListItem.scss';

const CategoryMenuListItem = ({
  type,
  label,
  children,
  onAction,
}: CategoryMenuListItemProps) => {
  const listItemClasses = useMemo(() => {
    return type === 'delete'
      ? 'category-menu-list-item delete'
      : 'category-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses}>
      <button type='button' onClick={onAction}>
        {label} {children}
      </button>
    </li>
  );
};

export default CategoryMenuListItem;
