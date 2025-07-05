import { useMemo } from 'react';

import SaveIcon from './SaveIcon';

import { SavePostProps } from '../types';

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

  return (
    <button type='button' onClick={onSave} disabled={isLoading || isAdmin}>
      <SaveIcon isLoading={isLoading} hasSaved={hasSaved} />
      <span>{count}</span>
    </button>
  );
};

export default SavePost;
