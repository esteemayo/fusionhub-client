import { Outlet } from 'react-router-dom';

import AccountMenu from '../../accountMenu/AccountMenu';
import ToggleButton from '../../toggleButton/ToggleButton';

import './AccountLayout.scss';

const AccountLayout = () => {
  return (
    <div className='accountLayout'>
      <div className='accountLayout__container'>
        <AccountMenu />
        <div className='accountLayout__outlet'>
          <Outlet />
        </div>
        <div className='accountLayout__container--btn'>
          <ToggleButton
            label='Menu'
            isOpen={false}
            onClick={() => console.log('clicked!')}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
