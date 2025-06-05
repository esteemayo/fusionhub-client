import { useEffect, useState } from 'react';

import Spinner from '../Spinner';
import ProfileComment from '../profileComment/ProfileComment';

import './ProfileComments.scss';

const ProfileComments = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div className='profile-comments'>
      {isLoading ? (
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
