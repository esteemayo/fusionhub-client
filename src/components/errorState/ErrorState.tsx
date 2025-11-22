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
      aria-labelledby='error-title'
      aria-describedby='error-subtitle'
    >
      <div className='error-state__container'>
        <div className='error-state__wrapper'>
          <div className='error-state__box'>
            {imgSrc && (
              <Image
                src={imgSrc as string}
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
              titleId='error-title'
              subtitleId='error-subtitle'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorState;
