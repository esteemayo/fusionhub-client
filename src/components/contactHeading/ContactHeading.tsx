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

  const headingId = 'contact-heading-title';
  const subtitleId = 'contact-heading-subtitle';

  const HeadingTag = type === 'lg' ? 'h2' : type === 'md' ? 'h3' : 'h4';

  return (
    <div
      className='contact-heading'
      aria-labelledby={headingId}
      aria-describedby={subtitleId}
    >
      <HeadingTag id={headingId} className={`contact-heading__header ${type}`}>
        {title}
      </HeadingTag>
      <p id={subtitleId} className={paragraphClasses}>
        {subtitle}
      </p>
    </div>
  );
};

export default ContactHeading;
