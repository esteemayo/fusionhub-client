import './TagItem.scss';

const TagItem = ({ label }: { label: string }) => {
  return <span className='tagItem'>{label}</span>;
};

export default TagItem;
