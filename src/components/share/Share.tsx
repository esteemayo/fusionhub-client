import SavePost from '../SavePost';
import ShareButton from '../ShareButton';

import { ShareProps } from '../../types';

import './Share.scss';

const Share = ({
  title,
  desc,
  slug,
  isSaved,
  currentUser,
  saveMutation,
  onClick,
}: ShareProps) => {
  return (
    <div className='share'>
      <SavePost
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
