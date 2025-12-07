import { Link } from 'react-router-dom';
import { TagItemProps } from '../../types';

import './TagItem.scss';

const TagItem = ({ label, onClose }: TagItemProps) => {
  const id = `tag-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Link
      to={`/posts?tag=${encodeURIComponent(label)}`}
      onClick={() => onClose?.()}
      className='tag-item'
      role='link'
      aria-label={`Filter posts by tag ${label}`}
      aria-labelledby={id}
      aria-describedby={`${id}-desc`}
      tabIndex={0}
    >
      <span id={id} className='tag-item__label'>
        {label}
      </span>

      <span id={`${id}-desc`} className='sr-only'>
        View posts filtered by tag {label}
      </span>
    </Link>
  );
};

export default TagItem;
