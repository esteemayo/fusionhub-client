import { useMemo } from 'react';
import { HeadingProps } from '../../types';

import './Heading.scss';

const Heading = ({
  title,
  subtitle,
  center,
  titleId,
  subtitleId,
}: HeadingProps) => {
  const headingClasses = useMemo(() => {
    return center ? 'heading center' : 'heading';
  }, [center]);

  return (
    <div
      className={headingClasses}
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
    >
      <h1 id={titleId} className='heading__main'>
        {title}
      </h1>
      <h2 id={subtitleId} className='heading__sub'>
        {subtitle}
      </h2>
    </div>
  );
};

export default Heading;
