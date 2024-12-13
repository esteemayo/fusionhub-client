import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import UserMenu from '../userMenu/UserMenu';

import { useAppDispatch } from '../../hooks/hooks';
import { onToggle } from '../../features/sidebar/sidebarSlice';

import './Navbar.scss';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = true;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleToggle = () => {
    dispatch(onToggle());
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
          <li className='navbar__links--item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navbar__links--item'>
            <Link to='/posts'>Posts</Link>
          </li>
          {user && (
            <div className='navbar__accounts'>
              <div className='navbar__account'>
                <img
                  src='avatar.png'
                  width={32.5}
                  height={32.5}
                  alt='avatar'
                  className='navbar__account--avatar'
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
