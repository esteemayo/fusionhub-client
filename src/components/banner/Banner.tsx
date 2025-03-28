import Image from '../Image';

import { BannerProps } from '../../types';

import './Banner.scss';

const Banner = ({
  file,
  banner,
  onChangeFile,
  onChangeBanner,
}: BannerProps) => {
  console.log(file);
  console.log(banner);

  return (
    <section className='banner'>
      <div className='banner__user'>
        <label htmlFor='avatar' className='banner__user--label'>
          <Image
            src={
              file
                ? URL.createObjectURL(file as Blob | MediaSource)
                : '/user-1.jpeg'
            }
            width={120}
            height={120}
            alt='avatar'
            className='banner__user--avatar'
          />
        </label>
        <input
          type='file'
          name='avatar'
          id='avatar'
          className='banner__user--input'
          onChange={onChangeFile}
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
          type='file'
          id='file'
          className='banner__cover--input'
          onChange={onChangeBanner}
        />
      </div>
    </section>
  );
};

export default Banner;
