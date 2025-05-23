import { SavePostProps } from '../types';

const SavePost = ({
  hasSaved,
  isLoading,
  currentUser,
  onSave,
}: SavePostProps) => {
  if (currentUser?.role === 'admin') {
    return null;
  }

  return (
    <button type='button' onClick={onSave} disabled={isLoading}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
          fill={
            isLoading
              ? hasSaved
                ? 'none'
                : '#dddcdc'
              : hasSaved
              ? '#dddcdc'
              : 'none'
          }
        />
      </svg>
    </button>
  );
};

export default SavePost;
