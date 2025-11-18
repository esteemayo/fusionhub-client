import UserMenu from '../userMenu/UserMenu';
import Logo from '../logo/Logo';
import SearchBar from '../searchBar/SearchBar';
import NavItem from '../navItem/NavItem';
import ToggleButton from '../toggleButton/ToggleButton';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import { onToggle } from '../../features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { menuItems } from '../../data';
import { userAvatarAlt } from '../../utils';

import './Navbar.scss';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const handleToggle = () => {
    dispatch(onToggle());
  };

  const avatarBase = currentUser?.details?.image;
  const avatarSrc = avatarBase ? avatarBase : '/user-default.jpg';

  const username = currentUser?.details.username as string;

  const isGoogleImage =
    currentUser?.details.fromGoogle &&
    currentUser.details.image?.startsWith('https');

  return (
    <nav role='navigation' aria-label='Main Navigation' className='navbar'>
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
          <ul
            id='navbar-links'
            className='navbar__links'
            role='menubar'
            aria-labelledby='menu-label'
          >
            <span id='menu-label' className='sr-only'>
              Navigation Links
            </span>
            {menuItems.map((menu) => {
              return <NavItem key={menu.id} {...menu} />;
            })}
            <div
              className='navbar__accounts'
              role='region'
              aria-label='User menu'
            >
              <div className='navbar__account'>
                {isGoogleImage ? (
                  <GoogleImage
                    key={avatarSrc}
                    src={avatarSrc}
                    width={32.5}
                    height={32.5}
                    alt={userAvatarAlt(username, 'Google')}
                    className='navbar__account--avatar'
                  />
                ) : (
                  <Image
                    key={avatarSrc}
                    src={avatarSrc}
                    width={32.5}
                    height={32.5}
                    alt={userAvatarAlt(username, 'Default user')}
                    className='navbar__account--avatar'
                  />
                )}
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
