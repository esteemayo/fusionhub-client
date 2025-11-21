import { UserAvatarSkeletonProps } from '../../types';

import './UserAvatarSkeleton.scss';

const UserAvatarSkeleton = ({
  size,
  className = '',
}: UserAvatarSkeletonProps) => {
  return (
    <div
      className={`user-avatar-skeleton ${className}`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};

export default UserAvatarSkeleton;
