import Input from './input/Input';
import Select from './select/Select';

import Upload from './upload/Upload';
import ProgressBar from './progressBar/ProgressBar';

import { PostImageProps } from '../types';

const PostImage = ({
  options,
  progress,
  register,
  errors,
  isLoading,
  onChangeData,
  onChangeProgress,
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
        defaultValue='Category'
        options={options}
        register={register}
        errors={errors}
        disabled={isLoading}
        validate
      />

      <Upload
        id='image'
        label='Image'
        disabled={isLoading || (0 < progress && progress < 100)}
        setData={onChangeData}
        setProgress={onChangeProgress}
      />
      {0 < progress && progress < 100 && <ProgressBar progress={progress} />}
    </>
  );
};

export default PostImage;
