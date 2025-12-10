import Input from './input/Input';
import PostTextBox from './postTextBox/PostTextBox';

import { PostDescriptionProps } from '../types';

const PostDescription = ({
  value,
  imageProgress,
  videoProgress,
  register,
  error,
  errors,
  isLoading,
  onChangeDesc,
  onChangeImageData,
  onChangeVideoData,
  onChangeImageProgress,
  onChangeVideoProgress,
}: PostDescriptionProps) => {
  return (
    <section
      className='post-description'
      role='region'
      aria-labelledby='post-description-heading'
    >
      <h2 id='post-description-heading' className='sr-only'>
        Post Description Section
      </h2>

      <Input
        name='title'
        label='Title'
        placeholder='Title'
        register={register}
        errors={errors}
        disabled={isLoading}
        validate
        aria-required='true'
        aria-describedby={errors?.title ? 'title-error' : undefined}
      />

      {errors?.title && (
        <p id='title-error' className='sr-only' role='alert'>
          {errors.title?.message as React.ReactNode}
        </p>
      )}

      <PostTextBox
        label='Description'
        value={value}
        imageProgress={imageProgress}
        videoProgress={videoProgress}
        error={error}
        onChangeDesc={onChangeDesc}
        onChangeImageData={onChangeImageData}
        onChangeVideoData={onChangeVideoData}
        onChangeImageProgress={onChangeImageProgress}
        onChangeVideoProgress={onChangeVideoProgress}
        aria-required='true'
        aria-invalid={!!error}
        aria-describedby={error ? 'description-error' : undefined}
      />

      {error && (
        <p id='description-error' className='sr-only' role='alert'>
          {error}
        </p>
      )}
    </section>
  );
};

export default PostDescription;
