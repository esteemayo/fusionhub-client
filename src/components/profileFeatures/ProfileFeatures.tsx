import { useMemo, useState } from 'react';

import ProfileReply from '../profileReply/ProfileReply';
import Article from '../article/Article';
import ProfileComment from '../profileComment/ProfileComment';

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
      bodyContent = (
        <>
          {Array.from(new Array(3)).map((_, index) => {
            return <Article key={index} />;
          })}
        </>
      );
      break;

    case 'comments':
      bodyContent = (
        <>
          {Array.from(new Array(2)).map((_, index) => {
            return <ProfileComment key={index} />;
          })}
        </>
      );
      break;

    case 'replies':
      bodyContent = (
        <>
          {Array.from(new Array(5)).map((_, index) => {
            return <ProfileReply key={index} />;
          })}
        </>
      );
      break;

    case 'likes':
      bodyContent = (
        <>
          {Array.from(new Array(3)).map((_, index) => {
            return <Article key={index} />;
          })}
        </>
      );
      break;

    case 'dislikes':
      bodyContent = (
        <>
          {Array.from(new Array(5)).map((_, index) => {
            return <Article key={index} />;
          })}
        </>
      );
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
