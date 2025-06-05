import { useEffect, useState } from 'react';

import Spinner from '../Spinner';
import Article from '../article/Article';

import './ProfileArticles.scss';

const ProfileArticles = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div className='profile-articles'>
      {isLoading ? (
        <div className='profile-articles__spinner'>
          <Spinner size={30} />
        </div>
      ) : (
        Array.from(new Array(3)).map((_, index) => {
          return <Article key={index} />;
        })
      )}
    </div>
  );
};

export default ProfileArticles;
