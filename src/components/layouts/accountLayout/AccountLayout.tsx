import { Outlet } from 'react-router-dom';

import AccountMenu from '../../accountMenu/AccountMenu';

import './AccountLayout.scss';

const AccountLayout = () => {
  return (
    <div className='accountLayout'>
      <div className='accountLayout__container'>
        <AccountMenu />
        <div className='accountLayout__outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
