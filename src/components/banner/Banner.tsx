import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import Image from '../Image';

import { BannerProps } from '../../types';

import './Banner.scss';

interface IContainer {
  banner: string;
}

const Banner = ({
  file,
  banner,
  onChangeFile,
  onChangeBanner,
}: BannerProps) => {
  const bannerImg = useMemo(() => {
    return banner
      ? URL.createObjectURL(banner as Blob | MediaSource)
      : 'https://ik.imagekit.io/devayo/post-2.jpeg';
  }, [banner]);

  return (
    <Container banner={bannerImg} className='banner'>
      <div className='banner__user'>
        <label htmlFor='avatar' className='banner__user--label'>
          {file ? (
            <img
              src={URL.createObjectURL(file as Blob | MediaSource)}
              width={120}
              height={120}
              alt='avatar'
              className='banner__user--avatar'
            />
          ) : (
            <Image
              src='/user-1.jpeg'
              width={120}
              height={120}
              alt='avatar'
              className='banner__user--avatar'
            />
          )}
        </label>
        <input
          type='file'
          id='avatar'
          name='avatar'
          onChange={onChangeFile}
          className='banner__user--input'
        />
      </div>
      <div className='banner__cover'>
        <label htmlFor='file' className='banner__cover--label'>
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
        </label>
        <input
          id='file'
          type='file'
          onChange={onChangeBanner}
          className='banner__cover--input'
        />
      </div>
    </Container>
  );
};

const Container = styled.section<IContainer>`
  background-image: ${({ banner }) => css`url(${banner})`};
`;

export default Banner;
