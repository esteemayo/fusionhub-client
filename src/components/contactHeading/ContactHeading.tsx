import { useMemo } from 'react';
import { ContactHeadingProps } from '../../types';

import './ContactHeading.scss';

const ContactHeading = ({
  title,
  subtitle,
  titleId,
  subtitleId,
  text,
  type,
}: ContactHeadingProps) => {
  const paragraphClasses = useMemo(
    () =>
      text === 'sm'
        ? 'contact-heading__paragraph sm'
        : 'contact-heading__paragraph',
    [text]
  );

  const HeadingTag = type === 'lg' ? 'h2' : type === 'md' ? 'h3' : 'h4';

  return (
    <div
      className='contact-heading'
      aria-labelledby={titleId ?? 'contact-heading-title'}
      aria-describedby={subtitleId ?? 'contact-heading-subtitle'}
    >
      <HeadingTag id={titleId} className={`contact-heading__header ${type}`}>
        {title}
      </HeadingTag>
      <p id={subtitleId} className={paragraphClasses}>
        {subtitle}
      </p>
    </div>
  );
};

export default ContactHeading;
