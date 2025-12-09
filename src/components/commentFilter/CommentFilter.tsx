import { useEffect, useMemo, useRef } from 'react';

import CommentFilterItem from '../commentFilterItem/CommentFilterItem';

import { commentFilters } from '../../data/formData';
import { CommentFilterProps, sortType } from '../../types';

import './CommentFilter.scss';

const CommentFilter = ({ isOpen, onClose, onSort }: CommentFilterProps) => {
  const menuRef = useRef<HTMLUListElement>(null);

  const handleSort = (value: sortType) => {
    onSort(value);
    onClose();
  };

  const commentFilterClasses = useMemo(
    () => (isOpen ? 'comment-filter show' : 'comment-filter hide'),
    [isOpen]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  return (
    <ul
      ref={menuRef}
      className={commentFilterClasses}
      role='menu'
      aria-label='Comment sort options'
      aria-hidden={!isOpen}
    >
      {commentFilters.map((filter) => {
        const { id, label } = filter;
        return (
          <CommentFilterItem
            key={id}
            value={label}
            onAction={() => handleSort(id)}
          />
        );
      })}
    </ul>
  );
};

export default CommentFilter;
