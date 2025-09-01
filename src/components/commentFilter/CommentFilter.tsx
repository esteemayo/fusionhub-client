import { useMemo } from 'react';

import { CommentFilterProps } from '../../types';

import './CommentFilter.scss';

const CommentFilter = ({ isOpen, onClose }: CommentFilterProps) => {
  const listClasses = useMemo(() => {
    return isOpen ? 'comment-filter show' : 'comment-filter hide';
  }, [isOpen]);

  return (
    <ul className={listClasses}>
      <li className='comment-filter__item' onClick={onClose}>
        <span className='comment-filter__item--label'>Best</span>
      </li>
      <li className='comment-filter__item' onClick={onClose}>
        <span className='comment-filter__item--label'>Newest</span>
      </li>
      <li className='comment-filter__item' onClick={onClose}>
        <span className='comment-filter__item--label'>Oldest</span>
      </li>
    </ul>
  );
};

export default CommentFilter;
