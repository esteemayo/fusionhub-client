import parse from 'html-react-parser';
import { useMemo, useState } from 'react';

import { excerpts } from '../../utils';

import './AboutProfile.scss';

const AboutProfile = ({ about }: { about: string }) => {
  const [isMore, setIsMore] = useState(false);

  const handleCollapse = () => {
    setIsMore(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore(true);
  };

  const parsedText = useMemo(() => {
    const content =
      isMore && about?.length > 450 ? about : excerpts(String(about), 450);

    return parse(String(content));
  }, [about, isMore]);

  const aboutClasses = useMemo(
    () => (about?.length > 0 ? 'about-profile show' : 'about-profile hide'),
    [about]
  );

  const btnClasses = useMemo(
    () =>
      about?.length > 450
        ? 'about-profile__wrapper--btn show'
        : 'about-profile__wrapper--btn hide',
    [about]
  );

  const btnLabel = useMemo(() => (!isMore ? 'more' : undefined), [isMore]);

  const accessibleBtnLabel = useMemo(
    () => (isMore ? 'Show less about user' : 'Show more about user'),
    [isMore]
  );

  if (!about) return null;

  return (
    <section
      className={aboutClasses}
      aria-label='About the user'
      aria-labelledby='about-profile-heading'
    >
      <div className='about-profile__container'>
        <h4
          id='about-profile-heading'
          className='about-profile__container--heading'
        >
          About me
        </h4>

        <div
          onClick={handleCollapse}
          className={`about-profile__wrapper ${isMore ? 'interactive' : ''}`}
        >
          <div aria-live='polite'>{parse(String(parsedText))}</div>
          <button
            type='button'
            onClick={handleClick}
            className={btnClasses}
            aria-label={accessibleBtnLabel}
            aria-expanded={isMore}
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutProfile;
