import { ClipLoader } from 'react-spinners';

import { SpinnerProps } from '../types';

const Spinner = ({ size = 20, color = '#fff' }: SpinnerProps) => {
  return <ClipLoader size={size} color={color} />;
};

export default Spinner;
