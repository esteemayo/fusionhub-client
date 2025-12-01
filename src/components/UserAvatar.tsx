import GoogleImage from './GoogleImage';
import Image from './Image';
import UserAvatarSkeleton from './userAvatarSkeleton/UserAvatarSkeleton';

import { UserAvatarProps } from '../types';
import { userAvatarAlt } from '../utils';
import { useUserAvatar } from '../hooks/useUserAvatar';

const UserAvatar = ({
  alt,
  type,
  imgSrc,
  size,
  className = '',
  isGoogleAvatar,
  fallback = '/user-default.jpg',
}: UserAvatarProps) => {
  const { avatarSrc, currentUser, isGoogleImage, isLoading } =
    useUserAvatar(fallback);

  if (type === 'navbar' || type === 'sidebar') {
    if (isLoading) {
      return <UserAvatarSkeleton size={size as number} className={className} />;
    }
  }

  const src = imgSrc || avatarSrc || '';
  const username = currentUser?.details.username as string;

  const altText = alt
    ? alt
    : isGoogleImage
    ? userAvatarAlt(username, 'Google')
    : userAvatarAlt(username, 'Default user');

  const commonProps = {
    src,
    width: size,
    height: size,
    alt: altText || '',
    className,
  };

  const hasGoogleImage = isGoogleImage || Boolean(isGoogleAvatar);

  return hasGoogleImage ? (
    <GoogleImage key={src} {...commonProps} />
  ) : (
    <Image key={src} {...commonProps} />
  );
};

export default UserAvatar;
