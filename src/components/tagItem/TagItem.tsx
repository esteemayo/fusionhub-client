import { Link } from 'react-router-dom';

import { TagItemProps } from '../../types';

import './TagItem.scss';

const TagItem = ({ label }: TagItemProps) => {
  return (
    <Link to={`/posts?tag=${label}`} className='tag-item'>
      <span className='tag-item__label'>{label}</span>
    </Link>
  );
};

export default TagItem;
