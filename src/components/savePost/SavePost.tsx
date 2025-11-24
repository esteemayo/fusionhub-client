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
  const isAdmin = useMemo(
    () => currentUser?.role === 'admin',
    [currentUser?.role]
  );

  const btnClasses = useMemo(
    () => (hasSaved ? 'save-post__btn active' : 'save-post__btn'),
    [hasSaved]
  );

  return (
    <div onClick={onSave} className='save-post'>
      <button
        type='button'
        disabled={isLoading || isAdmin}
        title={`${hasSaved ? 'Save' : 'Saved'} post`}
        aria-label='Save post'
        aria-disabled={isLoading || isAdmin}
        aria-pressed={hasSaved ?? false}
        className={btnClasses}
      >
        <SaveIcon isLoading={isLoading} hasSaved={hasSaved} />
      </button>
      {count > 0 && (
        <span
          className='save-post__count'
          aria-label={`${millify(count)} saved post count`}
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default SavePost;
