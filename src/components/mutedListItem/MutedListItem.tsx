import Image from '../Image';

import { MutedListItemProps } from '../../types';
import { useAppSelector } from '../../hooks/hooks';

import './MutedListItem.scss';

const MutedListItem = ({
  id,
  targetType,
  username,
  email,
  image,
  content,
  author,
  reason,
  mutedAt,
}: MutedListItemProps) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const handleUnmute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    alert(id);
  };

  return (
    <article className='muted-list-item'>
      <div className='muted-list-item__container'>
        <div className='muted-list-item__user'>
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
            alt='avatar'
            className='muted-list-item__user--img'
          />
          <div className='muted-list-item__details'>
            <span className='muted-list-item__details--username'>
              {`@${username ? username : author?.username}`}{' '}
              {`(${email ? email : author?.email})`}
            </span>
            {content && targetType !== 'User' && (
              <p className='muted-list-item__details--content'>"{content}"</p>
            )}
            <p className='muted-list-item__details--content'>{reason}</p>
            <small className='muted-list-item__details--muted-at'>
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
