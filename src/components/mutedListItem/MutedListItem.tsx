import Image from '../Image';

import './MutedListItem.scss';

const MutedListItem = () => {
  return (
    <article className='muted-list-item'>
      <div className='muted-list-item__container'>
        <div className='muted-list-item__user'>
          <Image
            width={40}
            height={40}
            src={'/img/user-default.jpg'}
            alt='avatar'
            className='muted-list-item__user--img'
          />
          <div className='muted-list-item__details'>
            <span className='muted-list-item__details--username'>
              @{'jdoe'}
            </span>
            <p className='muted-list-item__details--content'>
              This user has been muted due to spam
            </p>
            <small className='muted-list-item__details--muted-at'>
              Muted on {new Date(Date.now()).toLocaleString()}
            </small>
          </div>
        </div>
        <div className='muted-list-item__action'>
          <button
            type='button'
            className='muted-list-item__action--btn'
            aria-label={`Unmute user by authorUsername`}
          >
            Unmute
          </button>
        </div>
      </div>
    </article>
  );
};

export default MutedListItem;
