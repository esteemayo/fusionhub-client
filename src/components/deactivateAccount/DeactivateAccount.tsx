import AccountHeader from '../accountHeader/AccountHeader';

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
    <section
      className='deactivate-account'
      role='region'
      aria-labelledby='deactivate-count-title'
      aria-describedby='deactivate-count-description'
    >
      <div className='deactivate-account__container'>
        <AccountHeader
          title='De-activate account'
          subtitle='De-activating your account will remove all of your information from our database. This cannot be undone.'
          titleId='deactivate-count-title'
          descriptionId='deactivate-count-description'
        />
        <div className='deactivate-account__wrapper'>
          <button
            type='button'
            onClick={handleClick}
            className='deactivate-account__wrapper--btn'
            aria-haspopup='dialog'
            aria-label='Open confirmation dialog to de-activate mu account permanently'
          >
            De-activate my Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeactivateAccount;
