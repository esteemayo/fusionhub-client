import { useMemo, useState } from 'react';

import UserArticles from '../userArticles/UserArticles';

import './ProfileFeatures.scss';

const ProfileFeatures = ({ query }: { query: string | null }) => {
  const [isActive, setIsActive] = useState('article');

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.stopPropagation();
    setIsActive(type);
  };

  const profileClasses = useMemo(() => {
    return query ? 'profile-features show' : 'profile-features hide';
  }, [query]);

  let bodyContent: JSX.Element | undefined;

  switch (isActive) {
    case 'article':
      bodyContent = <UserArticles />;
      break;

    case 'comments':
      bodyContent = <h1>Comments</h1>;
      break;

    case 'replies':
      bodyContent = <h1>Replies</h1>;
      break;

    case 'likes':
      bodyContent = <h1>Likes</h1>;
      break;

    case 'dislikes':
      bodyContent = <h1>Dislikes</h1>;
      break;

    default:
      break;
  }

  return (
    <section className={profileClasses}>
      <div className='profile-features__container'>
        <div className='profile-features__wrapper'>
          <div className='profile-features__buttons'>
            <button
              type='button'
              className={
                isActive === 'article'
                  ? 'profile-features__buttons--btn active'
                  : 'profile-features__buttons--btn'
              }
              onClick={(e) => handleClick(e, 'article')}
            >
              Articles
            </button>
            <button
              type='button'
              className={
                isActive === 'comments'
                  ? 'profile-features__buttons--btn active'
                  : 'profile-features__buttons--btn'
              }
              onClick={(e) => handleClick(e, 'comments')}
            >
              Comments
            </button>
            <button
              type='button'
              className={
                isActive === 'replies'
                  ? 'profile-features__buttons--btn active'
                  : 'profile-features__buttons--btn'
              }
              onClick={(e) => handleClick(e, 'replies')}
            >
              Replies
            </button>
            <button
              type='button'
              className={
                isActive === 'likes'
                  ? 'profile-features__buttons--btn active'
                  : 'profile-features__buttons--btn'
              }
              onClick={(e) => handleClick(e, 'likes')}
            >
              Likes
            </button>
            <button
              type='button'
              className={
                isActive === 'dislikes'
                  ? 'profile-features__buttons--btn active'
                  : 'profile-features__buttons--btn'
              }
              onClick={(e) => handleClick(e, 'dislikes')}
            >
              Dislikes
            </button>
          </div>
        </div>
        <div className='profile-features__box'>{bodyContent}</div>
      </div>
    </section>
  );
};

export default ProfileFeatures;
