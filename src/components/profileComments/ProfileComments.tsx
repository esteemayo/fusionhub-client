import { useEffect, useState } from 'react';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Spinner from '../Spinner';
import ProfileComment from '../profileComment/ProfileComment';

import { PostType } from '../../types';

import './ProfileComments.scss';

const ProfileComments = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const data: PostType[] = [];

  return (
    <div className='profile-comments'>
      {(data ?? [])?.length < 1 && isLoading ? (
        <EmptyMessage
          title='empty replies'
          subtitle='something went wrong!'
          center
        />
      ) : isLoading ? (
        <div className='profile-comments__spinner'>
          <Spinner size={30} />
        </div>
      ) : (
        Array.from(new Array(2)).map((_, index) => {
          return <ProfileComment key={index} />;
        })
      )}
    </div>
  );
};

export default ProfileComments;
