import { AboutItemProps } from '../../types';

import './AboutItem.scss';

const AboutItem = ({ title, subtitle }: AboutItemProps) => {
  return (
    <article className='about-item'>
      <div className='about-item__container'>
        <h2 className='about-item__container--heading'>{title}</h2>
        <p className='about-item__container--paragraph'>{subtitle}</p>
      </div>
    </article>
  );
};

export default AboutItem;
