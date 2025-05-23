import SavePost from '../SavePost';
import ShareButton from '../ShareButton';

import { ShareProps } from '../../types';

import './Share.scss';

const Share = ({ isSaved, currentUser, saveMutation, onClick }: ShareProps) => {
  return (
    <div className='share'>
      <SavePost
        hasSaved={isSaved}
        isLoading={saveMutation.isPending}
        currentUser={currentUser}
        onSave={onClick}
      />
      <ShareButton />
    </div>
  );
};

export default Share;
