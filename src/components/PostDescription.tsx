import Input from './input/Input';
import TextQuill from './textQuill/TextQuill';

import { PostDescriptionProps } from '../types';

const PostDescription = ({
  title,
  value,
  onChange,
  onChangeDesc,
}: PostDescriptionProps) => {
  return (
    <>
      <Input
        name='title'
        label='Title'
        value={title}
        placeholder='Title'
        onChange={onChange}
      />
      <TextQuill label='Description' value={value} onChange={onChangeDesc} />
    </>
  );
};

export default PostDescription;
