import { IUserAvatar } from '../types';
import { useAppSelector } from './hooks';

export const useUserAvatar: IUserAvatar = (fallback = '/user-default.jpg') => {
  const { user: currentUser, imageVersion } = useAppSelector(
    (state) => state.auth
  );

  if (!currentUser || !currentUser.details) {
    return {
      avatarSrc: fallback,
      isGoogleImage: false,
      currentUser: null,
    };
  }

  const { image, fromGoogle } = currentUser.details;

  const avatarBase = image;
  const avatarSrc = avatarBase
    ? `${avatarBase}?v=${imageVersion}`
    : '/user-default.jpg';

  const isGoogleImage =
    Boolean(fromGoogle) &&
    typeof image === 'string' &&
    image.startsWith('https');

  return {
    avatarSrc,
    isGoogleImage,
    currentUser,
  };
};
