import Input from './input/Input';
import TextQuill from './textQuill/TextQuill';

import { PostDescriptionProps } from '../types';

const PostDescription = ({
  value,
  register,
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
        onChange={onChangeDesc}
        validate
      />
    </>
  );
};

export default PostDescription;
