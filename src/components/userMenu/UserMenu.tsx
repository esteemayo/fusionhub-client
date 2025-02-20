import { Link } from 'react-router-dom';

import { useLogout } from '../../hooks/useLogout';

import './UserMenu.scss';

const UserMenu = () => {
  const { handleLogout } = useLogout();

  const currentUser = false;

  return (
    <aside className='userMenu'>
      <div className='userMenu__container'>
        {currentUser ? (
          <>
            <ul className='userMenu__list'>
              <li className='userMenu__list--item'>
                <Link to='/accounts/profile'>Account</Link>
              </li>
            </ul>
            <div className='userMenu__wrapper'>
              <span className='username'>Elise beverley</span>
              <button
                type='button'
                className='logoutBtn'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className='userMenu__box'>
            <Link to='/login' className='userMenu__box--login'>
              Login
            </Link>
            <Link to='/register' className='userMenu__box--register'>
              Register
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default UserMenu;
