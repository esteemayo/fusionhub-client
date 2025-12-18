import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { CategoryItemProps } from '../../types';
import CategoryAction from '../categoryAction/CategoryAction';

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

  const onToggleHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!e) return;
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

  const isDisabled = useMemo(
    () => (isEditing && categoryId === category._id) || isEditing || isLoading,
    [category._id, categoryId, isEditing, isLoading]
  );

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, []);

  useEffect(() => {
    setIsOpen(activeCardId === category._id);
  }, [activeCardId, category._id]);

  return (
    <li
      className='category-item'
      role='listitem'
      aria-expanded={activeCardId === category._id}
      aria-selected={categoryId === category._id}
      aria-label={`Category: ${category.name}`}
      aria-disabled={isDisabled}
    >
      <div className='category-item__wrapper'>
        <span className='category-item__wrapper--name'>
          <Link
            to={`/posts?category=${category.name}`}
            aria-label={`View posts in the ${category.name} category`}
          >
            {category.name}
          </Link>
        </span>

        <CategoryAction
          isOpen={isOpen}
          isDisabled={isDisabled}
          currentUser={currentUser}
          onClose={handleClose}
          onRemove={handleRemove}
          onToggle={onToggleHandler}
          onUpdate={handleUpdate}
          aria-label={`Actions for category ${category.name}`}
        />
      </div>
    </li>
  );
};

export default CategoryItem;
