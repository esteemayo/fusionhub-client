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
    <>
      <Input
        name='title'
        label='Title'
        placeholder='Title'
        register={register}
        errors={errors}
        disabled={isLoading}
        validate
      />
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
      />
    </>
  );
};

export default PostDescription;
