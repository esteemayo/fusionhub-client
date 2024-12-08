import { Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__container--logo'>Logo</div>
        <ul className='navbar__container--links'>
          <li className='navbar__container--links-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navbar__container--links-item'>
            <Link to='posts'>Posts</Link>
          </li>
          <li className='navbar__container--links-item'>
            <Link to='account'>Account</Link>
          </li>
          <li className='navbar__container--links-item'>
            <Link to='login' className='login__btn'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
