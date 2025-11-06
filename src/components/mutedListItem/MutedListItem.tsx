import { useMemo } from 'react';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import { useMute } from '../../hooks/useMute';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { onOpen } from '../../features/muteModal/muteModalSlice';
import { MutedListItemProps, MuteModalType, MutePayload } from '../../types';

import './MutedListItem.scss';

const MutedListItem = ({
  id: targetId,
  targetType,
  username,
  image,
  content,
  author,
  reason,
  mutedAt,
}: MutedListItemProps) => {
  const dispatch = useAppDispatch();

  const { mutedList } = useMute();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const isMuted = useMemo(() => {
    return (
      (mutedList?.mutedUsers ?? []).some((user) => user.id === targetId) ||
      (mutedList?.mutedComments ?? []).some(
        (comment) => comment.id === targetId
      ) ||
      (mutedList?.mutedReplies ?? []).some((reply) => reply.id === targetId) ||
      false
    );
  }, [mutedList, targetId]);

  const handleUnmute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: MutePayload & MuteModalType = {
      targetId,
      targetType,
      isMuted,
    };

    dispatch(onOpen(payload));
  };

  return (
    <article className='muted-list-item'>
      <div className='muted-list-item__container'>
        <div className='muted-list-item__user'>
          {image?.startsWith('https') ? (
            <GoogleImage
              src={image ?? '/user-default.jpg'}
              width={40}
              height={40}
              alt={username ?? author?.username}
              className='banner__user--avatar'
            />
          ) : (
            <Image
              width={40}
              height={40}
              src={
                (image
                  ? image
                  : author
                  ? author.image
                  : '/user-default.jpg') as string
              }
              alt={username ?? author?.username}
              className='muted-list-item__user--img'
            />
          )}
          <div className='muted-list-item__details'>
            <span
              className='muted-list-item__details--username'
              aria-label={`@${username ? username : author?.username}`}
            >
              {`@${username ? username : author?.username}`}
            </span>
            {content && targetType !== 'User' && (
              <p
                className='muted-list-item__details--content'
                aria-label={`"${content}"`}
              >
                "{content}"
              </p>
            )}
            <p
              className='muted-list-item__details--content'
              aria-label={reason}
            >
              {reason}
            </p>
            <small
              className='muted-list-item__details--muted-at'
              aria-label={`Muted on ${new Date(mutedAt).toLocaleString()}`}
            >
              Muted on {new Date(mutedAt).toLocaleString()}
            </small>
          </div>
        </div>
        <div className='muted-list-item__action'>
          <button
            type='button'
            onClick={handleUnmute}
            aria-label={`Unmute ${username ?? author?.username} by ${
              currentUser?.details.username
            }`}
            className='muted-list-item__action--btn'
          >
            Unmute
          </button>
        </div>
      </div>
    </article>
  );
};

export default MutedListItem;
