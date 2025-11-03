import { useMemo } from 'react';

import Image from '../Image';

import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

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
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const isBlocked = useMemo(() => {
    return (blockedUsers ?? []).some((user) => user.id === targetId) || false;
  }, [blockedUsers, targetId]);

  const handleUnblock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: BlockPayload = {
      isBlocked,
      targetId,
    };

    dispatch(onOpen(payload));
  };

  return (
    <article className='blocked-user'>
      <div className='blocked-user__container'>
        <div className='blocked-user__cover'>
          <Image
            src={image ?? '/user-default.jpg'}
            alt='avatar'
            width={40}
            height={40}
            className='blocked-user__cover--img'
          />
          <div className='blocked-user__details'>
            <span className='blocked-user__details--username'>@{username}</span>
            <p className='blocked-user__details--content'>{reason}</p>
            <small className='blocked-user__details--muted-at'>
              Muted on {new Date(blockedAt).toLocaleString()}
            </small>
          </div>
        </div>
        <div className='blocked-user__action'>
          <button
            type='button'
            onClick={handleUnblock}
            aria-label={`Unmute ${username} by ${currentUser?.details.username}`}
            className='blocked-user__action--btn'
          >
            Unblock
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlockedUser;
