import { Link } from 'react-router-dom';

import { TagItemProps } from '../../types';

import './TagItem.scss';

const TagItem = ({ label, onClose }: TagItemProps) => {
  return (
    <Link
      to={`/posts?tag=${label}`}
      onClick={() => onClose?.()}
      className='tag-item'
      aria-label={`/posts?tag=${label}`}
    >
      <span className='tag-item__label' aria-label={label}>
        {label}
      </span>
    </Link>
  );
};

export default TagItem;
