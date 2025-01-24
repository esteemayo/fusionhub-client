import { Outlet } from 'react-router-dom';

import AccountMenu from '../../accountMenu/AccountMenu';
import ToggleButton from '../../toggleButton/ToggleButton';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { onToggle } from '../../../features/accountMenu/accountMenuSlice';

import './AccountLayout.scss';

const AccountLayout = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.accountMenu }));

  const handleToggle = () => {
    dispatch(onToggle());
  };

  return (
    <div className='accountLayout'>
      <div className='accountLayout__container'>
        <AccountMenu />
        <div className='accountLayout__container--outlet'>
          <Outlet />
        </div>
        <div className='accountLayout__container--btn'>
          <ToggleButton
            label='Account menu'
            isOpen={isOpen}
            onClick={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
