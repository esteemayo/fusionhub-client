import parse from 'html-react-parser';
import { useMemo, useState } from 'react';

import { excerpts } from '../../utils';

import './AboutProfile.scss';

const AboutProfile = ({ about }: { about: string }) => {
  const [readMore, setReadMore] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setReadMore((value) => {
      return !value;
    });
  };

  const parsedText = useMemo(() => {
    return readMore && about.length > 350
      ? parse(about.toString())
      : parse(excerpts(about.toString(), 350));
  }, [about, readMore]);

  const aboutClasses = useMemo(() => {
    return about.length > 0 ? 'about-profile show' : 'about-profile hide';
  }, [about]);

  const btnClasses = useMemo(() => {
    return about.length > 350
      ? 'about-profile__container--btn show'
      : 'about-profile__container--btn hide';
  }, [about]);

  const btnLabel = useMemo(() => {
    return `Read ${!readMore ? 'more' : 'less'} `;
  }, [readMore]);

  return (
    <section className={aboutClasses}>
      <div className='about-profile__container'>
        <h4 className='about-profile__container--heading'>About me</h4>
        {parsedText}
        <button type='button' className={btnClasses} onClick={handleClick}>
          {btnLabel}
        </button>
      </div>
    </section>
  );
};

export default AboutProfile;
