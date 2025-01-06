import Input from './input/Input';
import Select from './select/Select';

import { CategoryOptionType } from '../types';

const PostImage = ({ options }: { options: CategoryOptionType }) => {
  return (
    <>
      <Input name='tags' label='Tags' placeholder='Tags' />
      <Select name='category' label='Category' options={options} />
      <Input type='file' label='Image' accept='image/*' />
    </>
  );
};

export default PostImage;
