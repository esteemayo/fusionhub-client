import { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import BannerMenu from '../bannerMenu/BannerMenu';
import Upload from '../upload/Upload';
import UploadProgressCircle from '../uploadProgressCircle/UploadProgressCircle';

import * as bannerModal from '../../features/bannerModal/bannerModalSlice';
import * as blockModal from '../../features/blockModal/blockModalSlice';
import * as accountModal from '../../features/accountModal/accountModalSlice';
import * as imageModal from '../../features/imageModal/imageModalSlice';

import { useAppDispatch } from '../../hooks/hooks';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';

import { BannerProps, BlockPayload } from '../../types';

import './Banner.scss';

interface IContainer {
  cover: string;
}

const Banner = ({
  query,
  username,
  userId,
  image,
  banner,
  isShow,
  isFromGoogle,
  progress,
  advancement,
  onChangeCoverData,
  onChangeImageData,
  onChangeCoverProgress,
  onChangeImageProgress,
  onClose,
  onToggle,
}: BannerProps) => {
  const dispatch = useAppDispatch();

  const { blockedUsers } = useBlockedUsers();

  const isBlocked = useMemo(() => {
    return (blockedUsers ?? []).some((user) => user.id === userId) || false;
  }, [blockedUsers, userId]);

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log('muted');
    onClose();
  };

  const handleReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log('reported');
    onClose();
  };

  const handleBlock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: BlockPayload = {
      isBlocked,
      targetId: userId,
    };

    dispatch(blockModal.onOpen(payload));
    onClose();
  };

  const handleRemoveBanner = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(bannerModal.onOpen());
    onClose();
  };

  const handleRemoveAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(imageModal.onOpen());
    onClose();
  };

  const handleDeactivate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(accountModal.onOpen());
    onClose();
  };

  const coverImg = useMemo(() => {
    const imageUrl = (image: string) => `https://ik.imagekit.io/devayo${image}`;

    return banner ? imageUrl(banner) : imageUrl('/banner-1.jpg');
  }, [banner]);

  const wrapperClasses = useMemo(() => {
    return query ? 'banner__wrapper hide' : 'banner__wrapper show';
  }, [query]);

  const isDisabled = useMemo(() => {
    return (
      (0 < progress && progress < 100) || (0 < advancement && advancement < 100)
    );
  }, [advancement, progress]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      return window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <Container cover={coverImg} className='banner'>
      {0 < advancement && advancement < 100 && (
        <div aria-label={`Uploading ${advancement}`} className='banner__loader'>
          <UploadProgressCircle progress={advancement} />
        </div>
      )}
      <Upload
        disabled={(0 < progress && progress < 100) || !!query}
        setData={onChangeImageData}
        setProgress={onChangeImageProgress}
      >
        <div className='banner__user'>
          <div className={`banner__user--image ${!!query && 'disabled'}`}>
            {isFromGoogle && image?.startsWith('https') ? (
              <GoogleImage
                src={image ?? '/user-default.jpg'}
                width={120}
                height={120}
                alt={username}
                className='banner__user--avatar'
              />
            ) : (
              <Image
                src={image ?? '/user-default.jpg'}
                width={120}
                height={120}
                alt={username}
                className='banner__user--avatar'
              />
            )}
            {0 < progress && progress < 100 && (
              <div
                aria-label={`Uploading ${progress}`}
                className='banner__loader avatar'
              >
                <UploadProgressCircle progress={progress} />
              </div>
            )}
          </div>
        </div>
      </Upload>
      <div className='banner__box'>
        <div className={wrapperClasses}>
          <Upload
            disabled={0 < advancement && advancement < 100}
            setData={onChangeCoverData}
            setProgress={onChangeCoverProgress}
          >
            <div className='banner__cover'>
              <div
                aria-label='Image upload button'
                className='banner__cover--image'
              >
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
        </div>
        <BannerMenu
          isOpen={isShow}
          banner={banner}
          query={query}
          username={username}
          isBlocked={isBlocked}
          disabled={isDisabled}
          onToggle={onToggle}
          onMute={handleMute}
          onReport={handleReport}
          onBlock={handleBlock}
          onRemoveBanner={handleRemoveBanner}
          onRemoveAvatar={handleRemoveAvatar}
          onDeactivate={handleDeactivate}
        />
      </div>
    </Container>
  );
};

const Container = styled.section<IContainer>`
  background-image: ${({ cover }) => css`url(${cover})`};
`;

export default Banner;
