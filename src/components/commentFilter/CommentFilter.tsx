import { useMemo } from 'react';

import CommentFilterItem from '../commentFilterItem/CommentFilterItem';

import { commentFilters } from '../../data/formData';
import { CommentFilterProps, sortType } from '../../types';

import './CommentFilter.scss';

const CommentFilter = ({ isOpen, onClose, onSort }: CommentFilterProps) => {
  const handleSort = (value: sortType) => {
    onSort(value);
    onClose();
  };

  const commentFilterClasses = useMemo(() => {
    return isOpen ? 'comment-filter show' : 'comment-filter hide';
  }, [isOpen]);

  return (
    <ul className={commentFilterClasses}>
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
