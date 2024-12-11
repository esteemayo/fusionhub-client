import { Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  const user = true;

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__container--logo'>
          <Link to='/'>Logo</Link>
        </div>
        <ul className='navbar__container--links'>
          <li className='navbar__container--links-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navbar__container--links-item'>
            <Link to='/posts'>Posts</Link>
          </li>
          {user && (
            <li className='navbar__container--links-item'>
              <Link to='/account' className='avatarBox'>
                <img
                  src='avatar.png'
                  width={32.5}
                  height={32.5}
                  alt='avatar'
                  className='avatar'
                />
              </Link>
            </li>
          )}
          {!user && (
            <li className='navbar__container--links-item'>
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
