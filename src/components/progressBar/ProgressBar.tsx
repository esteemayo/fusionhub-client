import './ProgressBar.scss';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='progress-bar'>
      <div className='progress-bar__fill' style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
