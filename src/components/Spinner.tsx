import { ClipLoader } from 'react-spinners';

import { SpinnerProps } from '../types';

const Spinner = ({ size = 20, color = '#fff' }: SpinnerProps) => {
  return (
    <div
      role='status'
      aria-live='polite'
      aria-busy='true'
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <ClipLoader
        size={size}
        color={color}
        aria-label='Loading indicator'
        aria-hidden='true'
      />
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Spinner;
