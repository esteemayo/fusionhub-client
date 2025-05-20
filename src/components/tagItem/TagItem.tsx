import { TagItemProps } from '../../types';

import './TagItem.scss';

const TagItem = ({ label }: TagItemProps) => {
  return <span className='tag-item'>{label}</span>;
};

export default TagItem;
