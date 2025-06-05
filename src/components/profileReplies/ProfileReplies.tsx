import { useEffect, useState } from 'react';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Spinner from '../Spinner';
import ProfileReply from '../profileReply/ProfileReply';

import { PostType } from '../../types';

import './ProfileReplies.scss';

const ProfileReplies = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const data: PostType[] = [];

  return (
    <div className='profile-replies'>
      {(data ?? [])?.length < 1 && isLoading ? (
        <EmptyMessage
          title='empty replies'
          subtitle='something went wrong!'
          center
        />
      ) : isLoading ? (
        <div className='profile-replies__spinner'>
          <Spinner size={30} />
        </div>
      ) : (
        Array.from(new Array(5)).map((_, index) => {
          return <ProfileReply key={index} />;
        })
      )}
    </div>
  );
};

export default ProfileReplies;
