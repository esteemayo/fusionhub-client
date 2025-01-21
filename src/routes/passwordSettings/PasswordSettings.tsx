import AccountHeading from '../../components/accountHeading/AccountHeading';
import UpdatePassword from '../../components/updatePassword/UpdatePassword';
import DeactivateAccount from '../../components/deactivateAccount/DeactivateAccount';

import './PasswordSettings.scss';

const PasswordSettings = () => {
  return (
    <div className='passwordSettings'>
      <div className='passwordSettings__container'>
        <AccountHeading
          title='Account settings'
          subtitle='Update your account passwords/de-activate your account'
          type='profile'
        />
      </div>
      <UpdatePassword />
      <DeactivateAccount />
    </div>
  );
};

export default PasswordSettings;
