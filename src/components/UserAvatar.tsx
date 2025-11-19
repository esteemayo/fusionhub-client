import Image from './Image';
import GoogleImage from './GoogleImage';

import { UserAvatarProps } from '../types';
import { userAvatarAlt } from '../utils';
import { useUserAvatar } from '../hooks/useUserAvatar';

const UserAvatar = ({
  alt,
  imgSrc,
  size,
  className = '',
  isGoogleAvatar,
  fallback = '/user-default.jpg',
}: UserAvatarProps) => {
  const { avatarSrc, currentUser, isGoogleImage } = useUserAvatar(fallback);

  const src = imgSrc || avatarSrc;
  const username = currentUser?.details.username as string;

  const altText = alt
    ? alt
    : isGoogleImage
    ? userAvatarAlt(username, 'Google')
    : userAvatarAlt(username, 'Default user');

  const commonProps = {
    src,
    key: src,
    width: size,
    height: size,
    alt: altText,
    className,
  };

  const hasGoogleImage = isGoogleImage || Boolean(isGoogleAvatar);

  return hasGoogleImage ? (
    <GoogleImage {...commonProps} />
  ) : (
    <Image {...commonProps} />
  );
};

export default UserAvatar;
