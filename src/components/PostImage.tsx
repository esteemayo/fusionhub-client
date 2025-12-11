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
  const isUploading = progress > 0 && progress < 100;

  return (
    <fieldset
      aria-labelledby='post-image-section'
      aria-busy={isLoading || isUploading}
    >
      <legend id='post-image-section' className='sr-only'>
        Post image and metadata
      </legend>

      <Input
        name='tags'
        label='Tags'
        placeholder='Separate tags by commas'
        register={register}
        errors={errors}
        disabled={isLoading}
        validate
        aria-describedby={errors?.tags ? 'tags-error' : undefined}
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
        aria-describedby={errors?.category ? 'category-error' : undefined}
      />

      <Upload
        id='image'
        label='Upload Image'
        disabled={isLoading || isUploading}
        setData={onChangeData}
        setProgress={onChangeProgress}
        aria-label='Upload image for this post'
      />

      {isUploading && (
        <div role='status' aria-live='polite'>
          <ProgressBar
            progress={progress}
            aria-label='Post image upload progress'
          />
        </div>
      )}
    </fieldset>
  );
};

export default PostImage;
