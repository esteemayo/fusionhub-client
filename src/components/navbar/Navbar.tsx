import { Link } from 'react-router-dom';

import UserMenu from '../userMenu/UserMenu';
import ToggleButton from '../toggleButton/ToggleButton';

import { onToggle } from '../../features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { menuItems } from '../../data';

import './Navbar.scss';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));

  const user = true;

  const handleToggle = () => {
    dispatch(onToggle());
  };

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <Link to='/'>Fusion hub</Link>
        </div>
        <ToggleButton
          type='nav'
          label='Menu'
          isOpen={isOpen}
          onClick={handleToggle}
        />
        <ul className='navbar__links'>
          {menuItems.map((menu) => {
            const { id, url, label } = menu;
            return (
              <li key={id} className='navbar__links--item'>
                <Link to={url}>{label}</Link>
              </li>
            );
          })}
          {user && (
            <div className='navbar__accounts'>
              <div className='navbar__account'>
                <img
                  src='/user-default.jpg'
                  width={32.5}
                  height={32.5}
                  alt='avatar'
                  className='navbar__account--avatar'
                />
              </div>
              <UserMenu />
            </div>
          )}
          {!user && (
            <li className='navbar__links--item'>
              <Link to='/login' className='login__btn'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
