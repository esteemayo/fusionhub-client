import parse from 'html-react-parser';
import { useMemo, useState } from 'react';

import { excerpts } from '../../utils';

import './AboutProfile.scss';

const AboutProfile = ({ about }: { about: string }) => {
  const [isMore, setIsMore] = useState(false);

  const handleCollapse = () => {
    if (isMore) {
      setIsMore(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore((value) => {
      return !value;
    });
  };

  const parsedText = useMemo(() => {
    return isMore && about?.length > 350
      ? parse(String(about))
      : parse(excerpts(String(about), 350));
  }, [about, isMore]);

  const aboutClasses = useMemo(() => {
    return about?.length > 0 ? 'about-profile show' : 'about-profile hide';
  }, [about]);

  const btnClasses = useMemo(() => {
    return about?.length > 350
      ? 'about-profile__wrapper--btn show'
      : 'about-profile__wrapper--btn hide';
  }, [about]);

  const btnLabel = useMemo(() => {
    return !isMore ? 'more' : undefined;
  }, [isMore]);

  if (!about) {
    return null;
  }

  return (
    <section className={aboutClasses}>
      <div className='about-profile__container'>
        <h4 className='about-profile__container--heading'>About me</h4>
        <div onClick={handleCollapse} className='about-profile__wrapper'>
          {parse(String(parsedText))}
          <button type='button' className={btnClasses} onClick={handleClick}>
            {btnLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutProfile;
