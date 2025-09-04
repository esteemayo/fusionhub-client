import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './UploadProgressCircle.scss';

const UploadProgressCircle = ({ progress }: { progress: number }) => {
  return (
    <CircularProgressbar
      value={progress}
      text={`${progress}%`}
      styles={buildStyles({
        textColor: '#e9004f',
        pathColor: '#e9004f',
        trailColor: '#dddcdc',
      })}
      className='upload-progress-circle'
    />
  );
};

export default UploadProgressCircle;
