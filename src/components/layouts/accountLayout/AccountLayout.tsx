import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import AccountMenu from '../../accountMenu/AccountMenu';
import ToggleButton from '../../toggleButton/ToggleButton';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { onToggle } from '../../../features/accountMenu/accountMenuSlice';

import './AccountLayout.scss';

const AccountLayout = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.accountMenu }));
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const handleToggle = () => {
    dispatch(onToggle());
  };

  const btnContainerClasses = useMemo(() => {
    return currentUser
      ? 'account-layout__container--btn show'
      : 'account-layout__container--btn hide';
  }, [currentUser]);

  return (
    <div className='account-layout'>
      <div className='account-layout__container'>
        <AccountMenu />
        <div className='account-layout__container--outlet'>
          <Outlet />
        </div>
        <div className={btnContainerClasses}>
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
