import { Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__container--logo'>Logo</div>
        <ul className='navbar__container--links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='posts'>Posts</Link>
          </li>
          <li>
            <Link to='account'>Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
