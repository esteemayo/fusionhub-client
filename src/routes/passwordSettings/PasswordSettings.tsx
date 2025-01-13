import UpdatePassword from '../../components/updatePassword/UpdatePassword';
import DeactivateAccount from '../../components/deactivateAccount/DeactivateAccount';

import './PasswordSettings.scss';

const PasswordSettings = () => {
  return (
    <div className='passwordSettings'>
      <UpdatePassword />
      <DeactivateAccount />
    </div>
  );
};

export default PasswordSettings;
