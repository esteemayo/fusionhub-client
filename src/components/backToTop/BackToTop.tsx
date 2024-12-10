import { useState } from 'react';

import './BackToTop.scss';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  window.onscroll = () => {
    setIsVisible(() => {
      return window.scrollY > 300 ? true : false;
    });

    return window.onscroll === null;
  };

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='scroll'>
      {isVisible && (
        <button type='button' className='scroll__btn' onClick={handleScroll}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path
              fillRule='evenodd'
              d='M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
