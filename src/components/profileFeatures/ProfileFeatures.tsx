import { useMemo, useState } from 'react';

import ProfileReplies from '../profileReplies/ProfileReplies';
import ProfileArticles from '../profileArticles/ProfileArticles';
import ProfileComments from '../profileComments/ProfileComments';

import { profileMenus } from '../../data';

import './ProfileFeatures.scss';

const ProfileFeatures = ({ query }: { query: string | null }) => {
  const [isSelected, setIsSelected] = useState('articles');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setIsSelected(id);
  };

  const btnClasses = (id: string) => {
    return isSelected === id
      ? 'profile-features__buttons--btn active'
      : 'profile-features__buttons--btn';
  };

  const profileClasses = useMemo(() => {
    return query ? 'profile-features show' : 'profile-features hide';
  }, [query]);

  let bodyContent: JSX.Element | undefined;

  switch (isSelected) {
    case 'articles':
      bodyContent = <ProfileArticles />;
      break;

    case 'comments':
      bodyContent = <ProfileComments />;
      break;

    case 'likes':
      bodyContent = <ProfileArticles />;
      break;

    case 'replies':
      bodyContent = <ProfileReplies />;
      break;

    case 'dislikes':
      bodyContent = <ProfileArticles />;
      break;

    default:
      break;
  }

  return (
    <section className={profileClasses}>
      <div className='profile-features__container'>
        <div className='profile-features__wrapper'>
          <div className='profile-features__buttons'>
            {profileMenus.map((menu) => {
              const { id, label } = menu;
              return (
                <button
                  key={id}
                  type='button'
                  className={btnClasses(id)}
                  onClick={(e) => handleClick(e, id)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className='profile-features__box'>{bodyContent}</div>
      </div>
    </section>
  );
};

export default ProfileFeatures;
