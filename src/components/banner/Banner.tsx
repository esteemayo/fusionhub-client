import { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import UploadIcon from '../icons/UploadIcon';
import UserAvatar from '../UserAvatar';
import BannerMenu from '../bannerMenu/BannerMenu';

import Upload from '../upload/Upload';
import UploadProgressCircle from '../uploadProgressCircle/UploadProgressCircle';

import * as bannerModal from '../../features/bannerModal/bannerModalSlice';
import * as muteModal from '../../features/muteModal/muteModalSlice';
import * as reportModal from '../../features/reportModal/reportModalSlice';
import * as blockModal from '../../features/blockModal/blockModalSlice';
import * as accountModal from '../../features/accountModal/accountModalSlice';
import * as imageModal from '../../features/imageModal/imageModalSlice';

import { useWebShare } from '../../hooks/useWebShare';
import { useMute } from '../../hooks/useMute';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { useAppDispatch } from '../../hooks/hooks';

import { excerpts } from '../../utils';
import {
  BannerProps,
  BlockPayload,
  MuteModalType,
  MutePayload,
  ReportModalPayload,
} from '../../types';

import './Banner.scss';

interface IContainer {
  cover: string;
}

const Banner = ({
  bio,
  role,
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

  const shareUrl = `${window.location.href}`;

  const profileText = useMemo(
    () => (bio ? excerpts(bio, 80) : `@${username}`),
    [bio, username]
  );

  const { blockedUsers } = useBlockedUsers();
  const { mutedList } = useMute();
  const { handleShare } = useWebShare(
    `Share @${username}'s profile account`,
    profileText,
    shareUrl
  );

  const isMuted = useMemo(
    () =>
      !!(mutedList?.mutedUsers ?? []).some((user) => user.id === userId) ||
      false,
    [mutedList?.mutedUsers, userId]
  );

  const isBlocked = useMemo(
    () => !!(blockedUsers ?? []).some((user) => user.id === userId) || false,
    [blockedUsers, userId]
  );

  const shareHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    handleShare();
    onClose();
  };

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: MutePayload & MuteModalType = {
      targetId: userId,
      targetType: 'User',
      isMuted,
    };

    dispatch(muteModal.onOpen(payload));
    onClose();
  };

  const handleReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: ReportModalPayload = {
      user: {
        id: userId,
        username,
      },
      targetId: userId,
      targetType: 'User',
    };

    dispatch(reportModal.onOpen(payload));
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

  const avatarClasses = useMemo(
    () => (isBlocked ? 'banner__user--avatar blurred' : 'banner__user--avatar'),
    [isBlocked]
  );

  const wrapperClasses = useMemo(
    () => (query ? 'banner__wrapper hide' : 'banner__wrapper show'),
    [query]
  );

  const isDisabled = useMemo(
    () =>
      (0 < progress && progress < 100) ||
      (0 < advancement && advancement < 100),
    [advancement, progress]
  );

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const isGoogleImage = isFromGoogle && image?.startsWith('https');

  return (
    <Container cover={coverImg} className='banner'>
      {0 < advancement && advancement < 100 && (
        <div aria-label={`Uploading ${advancement}`} className='banner__loader'>
          <UploadProgressCircle progress={advancement} />
        </div>
      )}
      <Upload
        id='avatar'
        disabled={(0 < progress && progress < 100) || !!query}
        setData={onChangeImageData}
        setProgress={onChangeImageProgress}
      >
        <div className='banner__user'>
          <div className={`banner__user--image ${!!query && 'disabled'}`}>
            <UserAvatar
              imgSrc={image}
              size={120}
              alt={(query! && `${username}'s profile picture`) || ''}
              isGoogleAvatar={isGoogleImage}
              className={avatarClasses}
            />
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
            id='banner'
            disabled={0 < advancement && advancement < 100}
            setData={onChangeCoverData}
            setProgress={onChangeCoverProgress}
          >
            <div className='banner__cover'>
              <div
                aria-label='Image upload button'
                className='banner__cover--image'
              >
                <UploadIcon />
              </div>
            </div>
          </Upload>
        </div>
        <BannerMenu
          role={role}
          isOpen={isShow}
          image={image}
          banner={banner}
          query={query}
          username={username}
          isBlocked={isBlocked}
          isMuted={isMuted}
          disabled={isDisabled}
          onToggle={onToggle}
          onShare={shareHandler}
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
