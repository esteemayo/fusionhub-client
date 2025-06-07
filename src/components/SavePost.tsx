import SaveIcon from './SaveIcon';

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
      <SaveIcon isLoading={isLoading} hasSaved={hasSaved} />
    </button>
  );
};

export default SavePost;
