import Input from './input/Input';
import Textarea from './textarea/Textarea';

const PostDescription = () => {
  return (
    <>
      <Input name='title' label='Title' placeholder='Title' />
      <Textarea name='desc' label='Description' placeholder='Description' />
    </>
  );
};

export default PostDescription;
