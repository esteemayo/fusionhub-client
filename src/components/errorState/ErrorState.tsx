import Image from '../Image';
import Heading from '../heading/Heading';

import { ErrorStateProps } from '../../types';

import './ErrorState.scss';

const ErrorState = ({
  title,
  subtitle,
  center,
  imgSrc,
  alt,
}: ErrorStateProps) => {
  return (
    <section
      className='error-state'
      role='alert'
      aria-live='assertive'
      aria-labelledby='error-state-title'
      aria-describedby='error-state-subtitle'
    >
      <div className='error-state__container'>
        <div className='error-state__wrapper'>
          <div className='error-state__box'>
            {typeof imgSrc === 'string' && imgSrc && (
              <Image
                key={imgSrc}
                src={imgSrc}
                width={300}
                height={230}
                alt={alt}
                className='error-state__box--img'
              />
            )}
            <Heading
              title={title}
              subtitle={subtitle}
              center={center}
              titleId='error-state-title'
              subtitleId='error-state-subtitle'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorState;
