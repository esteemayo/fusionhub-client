import { useMemo } from 'react';

import { ContactHeadingProps } from '../../types';

import './ContactHeading.scss';

const ContactHeading = ({
  title,
  subtitle,
  text,
  type,
}: ContactHeadingProps) => {
  const paragraphClasses = useMemo(() => {
    return text === 'sm'
      ? 'contact-heading__paragraph sm'
      : 'contact-heading__paragraph';
  }, [text]);

  return (
    <div className='contact-heading'>
      {type === 'lg' ? (
        <h2 className='contact-heading__header lg'>{title}</h2>
      ) : type === 'md' ? (
        <h3 className='contact-heading__header md'>{title}</h3>
      ) : (
        <h4 className='contact-heading__header sm'>{title}</h4>
      )}
      <p className={paragraphClasses}>{subtitle}</p>
    </div>
  );
};

export default ContactHeading;
