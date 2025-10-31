// import Image from '../Image';

import { useAppSelector } from '../../hooks/hooks';

import './BlockedUser.scss';

const BlockedUser = () => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const handleUnblock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('user unblocked!');
  };

  return (
    <article className='blocked-user'>
      <div className='blocked-user__container'>
        <div className='blocked-user__cover'>
          <img
            src='/img/user-default.jpg'
            alt='avatar'
            width={40}
            height={40}
            className='blocked-user__cover--img'
          />
          <div className='blocked-user__details'>
            <span className='blocked-user__details--username'>@jdoe</span>
            <p className='blocked-user__details--content'>Spamming</p>
            <small className='blocked-user__details--muted-at'>
              Muted on {new Date(Date.now()).toLocaleString()}
            </small>
          </div>
        </div>
        <div className='blocked-user__action'>
          <button
            type='button'
            onClick={handleUnblock}
            aria-label={`Unmute ${'username'} by ${
              currentUser?.details.username
            }`}
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
