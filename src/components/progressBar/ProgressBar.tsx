import { ProgressBarProps } from '../../types';
import './ProgressBar.scss';

const ProgressBar = ({ progress, ...ariaProps }: ProgressBarProps) => {
  const value = Math.max(0, Math.min(progress, 100));

  return (
    <div
      className='progress-bar'
      role='progressbar'
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaProps['aria-label'] ?? 'Upload progress'}
      aria-valuetext={`${value}%`}
      {...ariaProps}
    >
      <div className='progress-bar__fill' style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
