import { useMemo } from 'react';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import { useMute } from '../../hooks/useMute';
import { useAppDispatch } from '../../hooks/hooks';

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
  type,
}: MutedListItemProps) => {
  const { mutedList } = useMute();
  const dispatch = useAppDispatch();

  const isMuted = useMemo(() => {
    const mutedReplies = mutedList?.mutedReplies ?? [];
    const mutedUsers = mutedList?.mutedUsers ?? [];
    const mutedComments = mutedList?.mutedComments ?? [];

    return (
      mutedUsers.some((user) => user.id === targetId) ||
      mutedComments.some((comment) => comment.id === targetId) ||
      mutedReplies.some((reply) => reply.id === targetId) ||
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

  const displayName = username ?? author?.username ?? 'Unknown user';

  return (
    <article
      className='muted-list-item'
      role='group'
      aria-labelledby={`muted-${type}-${targetId}`}
      aria-describedby={`muted-meta-${targetId}`}
      tabIndex={0}
    >
      <div className='muted-list-item__container'>
        <div className='muted-list-item__user'>
          {image?.startsWith('https') ? (
            <GoogleImage
              src={image ?? '/user-default.jpg'}
              width={40}
              height={40}
              alt={`${displayName}’s profile avatar`}
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
              alt={`${displayName}’s profile avatar`}
              className='muted-list-item__user--img'
            />
          )}
          <div className='muted-list-item__details'>
            <span
              id={`muted-${type}-${targetId}`}
              className='muted-list-item__details--username'
            >
              @{displayName}
            </span>

            {content && targetType !== 'User' && (
              <p
                className='muted-list-item__details--content'
                aria-label={`Muted content: ${content}`}
              >
                "{content}"
              </p>
            )}

            <p
              className='muted-list-item__details--content'
              aria-label={`Reason: ${reason}`}
            >
              {reason}
            </p>

            <small
              id={`muted-meta-${targetId}`}
              className='muted-list-item__details--muted-at'
              aria-label={`Muted on ${new Date(mutedAt).toLocaleString()}`}
            >
              Muted on{' '}
              <time dateTime={new Date(mutedAt).toISOString()}>
                {new Date(mutedAt).toLocaleString()}
              </time>
            </small>
          </div>
        </div>
        <div className='muted-list-item__action'>
          <button
            type='button'
            onClick={handleUnmute}
            className='muted-list-item__action--btn'
            aria-label={`Unmute ${displayName}`}
            aria-describedby={`muted-meta-${targetId}`}
          >
            Unmute
          </button>
        </div>
      </div>
    </article>
  );
};

export default MutedListItem;
