import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../heading/Heading';
import { EmptyStateProps } from '../../types';

import './EmptyState.scss';

const EmptyState = ({
  url,
  title,
  subtitle,
  center = true,
  imgSrc,
  alt,
  label = 'Return home',
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

  const imgClasses = useMemo(() => {
    return imgSrc ? 'emptyState__img show' : 'emptyState__img hide';
  }, [imgSrc]);

  const btnResetClasses = useMemo(() => {
    return showReset
      ? 'emptyState__btn--reset show'
      : 'emptyState__btn--reset hide';
  }, [showReset]);

  const btnReloadClasses = useMemo(() => {
    return showReload
      ? 'emptyState__btn--reload show'
      : 'emptyState__btn--reload hide';
  }, [showReload]);

  return (
    <div className='emptyState'>
      <div className='emptyState__container'>
        <div className='emptyState__wrapper'>
          <img
            src={imgSrc}
            width={300}
            height={230}
            alt={alt}
            className={imgClasses}
          />
          <Heading title={title} subtitle={subtitle} center={center} />
          <div className='emptyState__btn'>
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
