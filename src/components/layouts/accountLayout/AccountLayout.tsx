import { Outlet } from 'react-router-dom';

import AccountMenu from '../../accountMenu/AccountMenu';

import './AccountLayout.scss';

const AccountLayout = () => {
  return (
    <div className='accountLayout'>
      <div className='accountLayout__container'>
        <AccountMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
