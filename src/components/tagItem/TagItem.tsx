import './TagItem.scss';

const TagItem = ({ label }: { label: string }) => {
  return <span className='tag-item'>{label}</span>;
};

export default TagItem;
