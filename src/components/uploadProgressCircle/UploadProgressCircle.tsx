import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './UploadProgressCircle.scss';

const UploadProgressCircle = ({ progress }: { progress: number }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      role='progressbar'
      aria-valuenow={safeProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label='Upload progress'
      className='upload-progress-circle'
    >
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textColor: '#e9004f',
          pathColor: '#e9004f',
          trailColor: '#dddcdc',
        })}
      />
    </div>
  );
};

export default UploadProgressCircle;
