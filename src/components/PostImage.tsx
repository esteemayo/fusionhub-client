import Input from './input/Input';
import Select from './select/Select';

import { PostImageProps } from '../types';

const PostImage = ({
  tags,
  category,
  options,
  onChange,
  onChangeFile,
}: PostImageProps) => {
  return (
    <>
      <Input
        name='tags'
        label='Tags'
        value={tags}
        placeholder='Tags'
        onChange={onChange}
      />
      <Select
        name='category'
        label='Category'
        value={category}
        options={options}
        onChange={onChange}
      />
      <Input
        type='file'
        name='file'
        label='Image'
        accept='image/*'
        onChange={onChangeFile}
      />
    </>
  );
};

export default PostImage;
