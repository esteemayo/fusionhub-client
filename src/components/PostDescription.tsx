import Input from './input/Input';
import TextQuill from './textQuill/TextQuill';

import { PostDescriptionProps } from '../types';

const PostDescription = ({
  value,
  register,
  error,
  errors,
  onChangeDesc,
}: PostDescriptionProps) => {
  return (
    <>
      <Input
        name='title'
        label='Title'
        placeholder='Title'
        register={register}
        errors={errors}
        validate
      />
      <TextQuill
        label='Description'
        value={value}
        onChange={(value) => onChangeDesc(value)}
        error={error}
        validate
      />
    </>
  );
};

export default PostDescription;
