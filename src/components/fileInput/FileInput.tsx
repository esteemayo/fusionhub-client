import Label from '../label/Label';

import { FileInputProps } from '../../types';

import './FileInput.scss';

const FileInput = ({ name, label, ...rest }: FileInputProps) => {
  return (
    <div className='file-input'>
      <Label id={name} label={label} />
      <input
        {...rest}
        type='file'
        name={name}
        id={name}
        className='file-input__control'
      />
    </div>
  );
};

export default FileInput;
