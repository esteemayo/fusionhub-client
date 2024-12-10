import { useMemo } from 'react';

import { HeadingProps } from '../../types';

import './Heading.scss';

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  const headingClasses = useMemo(() => {
    return center ? 'heading center' : 'heading';
  }, [center]);

  return (
    <div className={headingClasses}>
      <h1 className='heading__main'>{title}</h1>
      <h2 className='heading__sub'>{subtitle}</h2>
    </div>
  );
};

export default Heading;
