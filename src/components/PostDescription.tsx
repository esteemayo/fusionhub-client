import { useState } from 'react';
import ReactQuill from 'react-quill-new';

import Input from './input/Input';

import 'react-quill-new/dist/quill.snow.css';

const PostDescription = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Input name='title' label='Title' placeholder='Title' />
      <ReactQuill theme='snow' value={value} onChange={setValue} />
    </>
  );
};

export default PostDescription;
