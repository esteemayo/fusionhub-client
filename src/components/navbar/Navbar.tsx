import UserMenu from '../userMenu/UserMenu';
import Logo from '../logo/Logo';
import ToggleButton from '../toggleButton/ToggleButton';
import NavItem from '../navItem/NavItem';

import Image from '../Image';
import SearchBar from '../searchBar/SearchBar';

import { onToggle } from '../../features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { menuItems } from '../../data';

import './Navbar.scss';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const handleToggle = () => {
    dispatch(onToggle());
  };

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__wrapper'>
          <Logo isOpen={isOpen} />
          <span>&nbsp;</span>
          <ToggleButton
            type='nav'
            label='Menu'
            isOpen={isOpen}
            onClick={handleToggle}
          />
          <ul className='navbar__links'>
            {menuItems.map((menu) => {
              return <NavItem key={menu.id} {...menu} />;
            })}
            <div className='navbar__accounts'>
              <div className='navbar__account'>
                <Image
                  src={currentUser?.details?.image ?? '/user-default.jpg'}
                  width={32.5}
                  height={32.5}
                  alt='avatar'
                  className='navbar__account--avatar'
                />
              </div>
              <UserMenu />
            </div>
          </ul>
        </div>
      </div>
      <SearchBar isOpen={isOpen} onToggle={handleToggle} />
    </nav>
  );
};

export default Navbar;
