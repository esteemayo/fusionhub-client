import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import './EmptyState.scss';
import Heading from '../heading/Heading';

import { EmptyStateProps } from '../../types';

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

  const imgBoxClasses = useMemo(() => {
    return formatImg ? 'empty-state__box space' : 'empty-state__box';
  }, [formatImg]);

  const imgClasses = useMemo(() => {
    return imgSrc ? 'empty-state__box--img show' : 'empty-state__box--img hide';
  }, [imgSrc]);

  const btnResetClasses = useMemo(() => {
    return showReset
      ? 'empty-state__btn--reset show'
      : 'empty-state__btn--reset hide';
  }, [showReset]);

  const btnReloadClasses = useMemo(() => {
    return showReload
      ? 'empty-state__btn--reload show'
      : 'empty-state__btn--reload hide';
  }, [showReload]);

  return (
    <div className='empty-state'>
      <div className='empty-state__container'>
        <div className='empty-state__wrapper'>
          <div className={imgBoxClasses}>
            <Image
              src={imgSrc}
              width={300}
              height={230}
              alt={alt}
              className={imgClasses}
            />
            <Heading title={title} subtitle={subtitle} center={center} />
          </div>
          <div className='empty-state__btn'>
            <button
              type='button'
              className={btnResetClasses}
              onClick={handleReset}
            >
              {label}
            </button>
            <button
              type='button'
              className={btnReloadClasses}
              onClick={handleReload}
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
