import millify from 'millify';
import { useMemo } from 'react';

import SaveIcon from '../icons/SaveIcon';

import { SavePostProps } from '../../types';

import './SavePost.scss';

const SavePost = ({
  count,
  hasSaved,
  isLoading,
  currentUser,
  onSave,
}: SavePostProps) => {
  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser?.role]);

  const btnClasses = useMemo(() => {
    return hasSaved ? 'save-post__btn active' : 'save-post__btn';
  }, [hasSaved]);

  return (
    <div onClick={onSave} className='save-post'>
      <button
        type='button'
        disabled={isLoading || isAdmin}
        aria-label='Save post'
        aria-disabled={isLoading || isAdmin}
        className={btnClasses}
      >
        <SaveIcon isLoading={isLoading} hasSaved={hasSaved} />
      </button>
      {count > 0 && (
        <span aria-label={millify(count)} className='save-post__count'>
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default SavePost;
