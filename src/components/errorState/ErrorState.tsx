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
    <section className='error-state'>
      <div className='error-state__container'>
        <div className='error-state__wrapper'>
          <div className='error-state__box'>
            <Image
              src={imgSrc as string}
              width={300}
              height={230}
              alt={alt}
              className='error-state__box--img'
            />
            <Heading title={title} subtitle={subtitle} center={center} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorState;
