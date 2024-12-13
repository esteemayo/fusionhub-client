import { useState } from 'react';
import { Link } from 'react-router-dom';

import UserMenu from '../userMenu/UserMenu';

import { useAppDispatch } from '../../hooks/hooks';
import { onToggle } from '../../features/sidebar/sidebarSlice';

import { menuItems } from '../../data';

import './Navbar.scss';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = true;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    dispatch(onToggle());
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((value) => {
      return !value;
    });
  };

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <Link to='/'>Logo</Link>
        </div>
        <div className='navbar__toggle' onClick={handleToggle}>
          <span>Menu</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='size-5'
          >
            <path
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm7 10.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z'
              clipRule='evenodd'
            />
          </svg>
        </div>
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
                  src='avatar.png'
                  width={32.5}
                  height={32.5}
                  alt='avatar'
                  className='navbar__account--avatar'
                  onMouseOver={handleToggleMenu}
                />
              </div>
              <UserMenu isOpen={isMenuOpen} />
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
