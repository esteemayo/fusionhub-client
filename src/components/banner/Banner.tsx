import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import Image from '../Image';
import Upload from '../upload/Upload';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/bannerModal/bannerModalSlice';

import { BannerProps } from '../../types';

import './Banner.scss';

interface IContainer {
  cover: string;
}

const Banner = ({
  query,
  image,
  banner,
  setCoverData,
  setImageData,
  setCoverProgress,
  setImageProgress,
}: BannerProps) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onOpen());
  };

  const coverImg = useMemo(() => {
    const imageUrl = (image: string) => `https://ik.imagekit.io/devayo${image}`;

    return banner ? imageUrl(banner) : imageUrl('/banner-1.jpg');
  }, [banner]);

  const wrapperClasses = useMemo(() => {
    return query ? 'banner__wrapper hide' : 'banner__wrapper show';
  }, [query]);

  const btnClasses = useMemo(() => {
    return banner ? 'banner__btn show' : 'banner__btn hide';
  }, [banner]);

  return (
    <Container cover={coverImg} className='banner'>
      <Upload
        disabled={!!query}
        setData={setImageData}
        setProgress={setImageProgress}
      >
        <div className='banner__user'>
          <div className={`banner__user--image ${!!query && 'disabled'}`}>
            <Image
              src={image ?? '/user-default.jpg'}
              width={120}
              height={120}
              alt='avatar'
              className='banner__user--avatar'
            />
          </div>
        </div>
      </Upload>
      <div className={wrapperClasses}>
        <Upload setData={setCoverData} setProgress={setCoverProgress}>
          <div className='banner__cover'>
            <div className='banner__cover--image'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
                />
              </svg>
            </div>
          </div>
        </Upload>
        <button type='button' className={btnClasses} onClick={handleClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </Container>
  );
};

const Container = styled.section<IContainer>`
  background-image: ${({ cover }) => css`url(${cover})`};
`;

export default Banner;
