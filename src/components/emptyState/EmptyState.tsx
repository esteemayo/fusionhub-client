import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../heading/Heading';
import { EmptyStateProps } from '../../types';

import './EmptyState.scss';

import Image from '../Image';

const EmptyState = ({
  url,
  title,
  subtitle,
  center = true,
  imgSrc,
  alt,
  label = 'Return home',
  formatImg,
  showReset,
  showReload,
  ...ariaProps
}: EmptyStateProps) => {
  const navigate = useNavigate();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const redirectUrl = url ? `/${url}` : '/';

    navigate(redirectUrl);
    return;
  };

  const handleReload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.location.assign(window.location.pathname);
  };

  const imgBoxClasses = useMemo(
    () => (formatImg ? 'empty-state__box space' : 'empty-state__box'),
    [formatImg]
  );

  const imgClasses = useMemo(
    () =>
      imgSrc ? 'empty-state__box--img show' : 'empty-state__box--img hide',
    [imgSrc]
  );

  const btnResetClasses = useMemo(
    () =>
      showReset
        ? 'empty-state__btn--reset show'
        : 'empty-state__btn--reset hide',
    [showReset]
  );

  const btnReloadClasses = useMemo(
    () =>
      showReload
        ? 'empty-state__btn--reload show'
        : 'empty-state__btn--reload hide',
    [showReload]
  );

  const headingId = 'empty-state-heading';
  const descriptionId = 'empty-state-description';

  return (
    <div
      className='empty-state'
      role='region'
      aria-labelledby={headingId}
      tabIndex={-1}
      {...ariaProps}
    >
      <div className='empty-state__container'>
        <div className='empty-state__wrapper' role='presentation'>
          <div className={imgBoxClasses}>
            <Image
              src={imgSrc!}
              width={300}
              height={230}
              alt={alt || ''}
              className={imgClasses}
              aria-hidden={!alt}
            />

            <Heading
              title={title}
              subtitle={subtitle}
              center={center}
              titleId={headingId}
              subtitleId={descriptionId}
            />
          </div>

          <div className='empty-state__btn'>
            <button
              type='button'
              onClick={handleReset}
              className={btnResetClasses}
              aria-label={label || 'Go back home'}
            >
              {label}
            </button>

            <button
              type='button'
              onClick={handleReload}
              className={btnReloadClasses}
              aria-label='Reload this page'
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
