import Select from './select/Select';
import Input from './input/Input';
import Upload from './upload/Upload';

import { PostImageProps } from '../types';

const PostImage = ({
  options,
  register,
  errors,
  isLoading,
  setData,
  setProgress,
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
      <Upload
        id='image'
        label='Image'
        disabled={isLoading}
        setData={setData}
        setProgress={setProgress}
      />
    </>
  );
};

export default PostImage;
