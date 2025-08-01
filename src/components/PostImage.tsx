import Select from './select/Select';
import Input from './input/Input';
import FileInput from './fileInput/FileInput';

import { PostImageProps } from '../types';

const PostImage = ({
  options,
  register,
  errors,
  isLoading,
  onChangeFile,
}: PostImageProps) => {
  return (
    <>
      <Input
        name='tags'
        label='Tags'
        placeholder='Separate tags by commas'
        register={register}
        errors={errors}
        disabled={isLoading}
        validate
      />
      <Select
        name='category'
        label='Category'
        options={options}
        register={register}
        errors={errors}
        disabled={isLoading}
        validate
      />
      <FileInput
        name='file'
        label='Image'
        accept='image/*'
        onChange={onChangeFile}
        disabled={isLoading}
      />
    </>
  );
};

export default PostImage;
