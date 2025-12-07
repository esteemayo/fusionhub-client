import SavePost from '../savePost/SavePost';
import ShareButton from '../shareButton/ShareButton';

import { ShareProps } from '../../types';

import './Share.scss';

const Share = ({
  title,
  desc,
  savedCount,
  slug,
  isSaved,
  currentUser,
  saveMutation,
  onClick,
}: ShareProps) => {
  return (
    <div className='share' role='region' aria-label='Save and share actions'>
      <SavePost
        count={savedCount}
        hasSaved={isSaved}
        isLoading={saveMutation.isPending}
        currentUser={currentUser}
        onSave={onClick}
      />
      <ShareButton title={title} desc={desc} slug={slug} />
    </div>
  );
};

export default Share;
