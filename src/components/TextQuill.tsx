import ReactQuill from 'react-quill-new';

import Label from './label/Label';
import { TextQuillProps } from '../types';

import 'react-quill-new/dist/quill.snow.css';

const TextQuill = ({ id, label, value, onChange }: TextQuillProps) => {
  return (
    <>
      <Label id={id} label={label} />
      <ReactQuill theme='snow' value={value} onChange={onChange} />
    </>
  );
};

export default TextQuill;
