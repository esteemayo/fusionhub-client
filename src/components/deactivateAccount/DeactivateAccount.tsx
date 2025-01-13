import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/accountModal/accountModalSlice';

import './DeactivateAccount.scss';

const DeactivateAccount = () => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onOpen());
  };

  return (
    <section className='deactivateAccount'>
      <div className='deactivateAccount__container'>
        <div className='deactivateAccount__header'>
          <h2 className='deactivateAccount__header--heading'>
            Deactivate account
          </h2>
          <span className='deactivateAccount__header--text'>
            Deleting your account will remove all of your information from our
            database. This cannot be undone.
          </span>
        </div>
        <div className='deactivateAccount__wrapper'>
          <button
            type='button'
            className='deactivateAccount__wrapper--btn'
            onClick={handleClick}
          >
            Delete my Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeactivateAccount;
