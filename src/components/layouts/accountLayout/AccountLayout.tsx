import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import AccountMenu from '../../accountMenu/AccountMenu';
import ToggleButton from '../../toggleButton/ToggleButton';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { onToggle } from '../../../features/accountMenu/accountMenuSlice';

import { useQueryParams } from '../../../utils';

import './AccountLayout.scss';

const AccountLayout = () => {
  const dispatch = useAppDispatch();

  const query = useQueryParams();
  const username = query.get('username');

  const { isOpen } = useAppSelector((state) => ({ ...state.accountMenu }));
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const handleToggle = () => {
    dispatch(onToggle());
  };

  const containerClasses = useMemo(() => {
    return username
      ? 'account-layout__container user'
      : 'account-layout__container';
  }, [username]);

  const btnContainerClasses = useMemo(() => {
    return currentUser && !username
      ? 'account-layout__container--btn show'
      : 'account-layout__container--btn hide';
  }, [currentUser, username]);

  return (
    <div className='account-layout'>
      <div className={containerClasses}>
        <AccountMenu query={username} />
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
