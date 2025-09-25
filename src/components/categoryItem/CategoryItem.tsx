import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import CategoryAction from '../categoryAction/CategoryAction';

import { CategoryItemProps } from '../../types';

import './CategoryItem.scss';

const CategoryItem = ({
  category,
  categoryId,
  activeCardId,
  isEditing,
  isLoading,
  currentUser,
  onChangeCardId,
  onEdit,
  onRemove,
}: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsOpen((value) => {
      if (value) {
        onChangeCardId(null);
        return false;
      } else {
        onChangeCardId(category._id);
        return true;
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onEdit(e, category);
    handleClose();
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onRemove(e, category._id);
    handleClose();
  };

  const isDisabled = useMemo(() => {
    return (isEditing && categoryId === category._id) || isEditing || isLoading;
  }, [category._id, categoryId, isEditing, isLoading]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsOpen(activeCardId === category._id);
  }, [activeCardId, category._id]);

  return (
    <li className='category-item'>
      <div className='category-item__wrapper'>
        <span className='category-item__wrapper--name'>
          <Link to={`/posts?category=${category.name}`}>{category.name}</Link>
        </span>
        <CategoryAction
          isOpen={isOpen}
          isDisabled={isDisabled}
          currentUser={currentUser}
          onRemove={handleRemove}
          onToggle={onToggleHandler}
          onUpdate={handleUpdate}
        />
      </div>
    </li>
  );
};

export default CategoryItem;
