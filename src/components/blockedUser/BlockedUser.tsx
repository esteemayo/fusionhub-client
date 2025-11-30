import { useMemo } from 'react';

import UserAvatar from '../UserAvatar';

import { useAppDispatch } from '../../hooks/hooks';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';

import { BlockedUserProps, BlockPayload } from '../../types';
import { onOpen } from '../../features/blockModal/blockModalSlice';

import './BlockedUser.scss';

const BlockedUser = ({
  id: targetId,
  username,
  image,
  reason,
  blockedAt,
}: BlockedUserProps) => {
  const dispatch = useAppDispatch();
  const { blockedUsers } = useBlockedUsers();

  const isBlocked = useMemo(
    () => !!(blockedUsers ?? []).some((user) => user.id === targetId) || false,
    [blockedUsers, targetId]
  );

  const avatarClasses = useMemo(
    () =>
      isBlocked
        ? 'blocked-user__cover--img blurred'
        : 'blocked-user__cover--img',
    [isBlocked]
  );

  const handleUnblock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: BlockPayload = {
      isBlocked,
      targetId,
    };

    dispatch(onOpen(payload));
  };

  const isGoogleImage = image?.startsWith('https') || false;

  return (
    <article
      className='blocked-user'
      role='group'
      aria-labelledby={`blocked-user-${targetId}`}
      aria-describedby={`blocked-meta-${targetId}`}
      tabIndex={0}
    >
      <div className='blocked-user__container'>
        <div className='blocked-user__cover'>
          <UserAvatar
            imgSrc={image}
            size={40}
            isGoogleAvatar={isGoogleImage}
            alt={`${username}’s profile avatar`}
            className={avatarClasses}
          />
          <div className='blocked-user__details'>
            <span
              id={`blocked-user-${targetId}`}
              className='blocked-user__details--username'
            >
              @{username}
            </span>

            <p
              className='blocked-user__details--content'
              aria-label={`Reason: ${reason}`}
            >
              {reason}
            </p>

            <small
              id={`blocked-meta-${targetId}`}
              className='blocked-user__details--muted-at'
              aria-label={`Blocked on ${new Date(blockedAt).toLocaleString()}`}
            >
              Muted on{' '}
              <time dateTime={new Date(blockedAt).toISOString()}>
                {new Date(blockedAt).toLocaleString()}
              </time>
            </small>
          </div>
        </div>

        <div className='blocked-user__action'>
          <button
            type='button'
            onClick={handleUnblock}
            className='blocked-user__action--btn'
            aria-label={`Unblock ${username}`}
            aria-describedby={`blocked-meta-${targetId}`}
          >
            Unblock
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlockedUser;
