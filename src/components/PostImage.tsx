import Select from './select/Select';
import Input from './input/Input';
import FileInput from './fileInput/FileInput';

import { PostImageProps } from '../types';

const PostImage = ({
  options,
  register,
  errors,
  onChangeFile,
}: PostImageProps) => {
  return (
    <>
      <Input
        name='tags'
        label='Tags'
        placeholder='Tags'
        register={register}
        errors={errors}
      />
      <Select
        name='category'
        label='Category'
        options={options}
        register={register}
        errors={errors}
      />
      <FileInput
        name='file'
        label='Image'
        accept='image/*'
        onChange={onChangeFile}
      />
    </>
  );
};

export default PostImage;
