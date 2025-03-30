import Image from '../Image';

import { ProfileImageProps } from '../../types';

import './ProfileImage.scss';

const ProfileImage = ({ ref, file, onChange, onUpload }: ProfileImageProps) => {
  return (
    <div className='profile-image'>
      <div className='profile-image__container'>
        <div className='profile-image__user'>
          <div className='profile-image__image'>
            {file ? (
              <img
                src={URL.createObjectURL(file as Blob | MediaSource)}
                width={120}
                height={120}
                alt='avatar'
                className='profile-image__image--avatar'
              />
            ) : (
              <Image
                src='/user-default.jpg'
                width={120}
                height={120}
                alt='avatar'
                className='profile-image__image--avatar'
              />
            )}
            <div className='profile-image__container--icon'>
              <label htmlFor='file'>
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
                    d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z'
                  />
                </svg>
              </label>
              <input
                id='file'
                type='file'
                accept='image/*'
                onChange={onChange}
                ref={ref}
              />
            </div>
          </div>
          <div className='profile-image__details'>
            <span className='profile-image__details--name'>Elise beverley</span>
            <span className='profile-image__details--bio'>
              I'm a Senior Frontend Developer based in U.S. A Full-stack
              JavaScript Developer (React, NextJS, VueJS, NodeJS, GraphQL,
              HTML5, CSS3)
            </span>
            <button type='button' className='profile-image__details--btn'>
              Show more
            </button>
          </div>
        </div>
      </div>
      <div className='profile-image__buttons'>
        <button
          type='button'
          className='profile-image__buttons--upload'
          onClick={onUpload}
        >
          Upload
        </button>
        <button type='button' className='profile-image__buttons--remove'>
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
