import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import './UserMenu.scss';

const UserMenu = ({ isOpen }: { isOpen: boolean }) => {
  const menuClasses = useMemo(() => {
    return isOpen ? 'userMenu show' : 'userMenu hide';
  }, [isOpen]);

  return (
    <aside className={menuClasses}>
      <div className='userMenu__container'>
        <ul className='userMenu__list'>
          <li className='userMenu__list--item'>
            <Link to='/account'>Account</Link>
          </li>
        </ul>
        <div className='userMenu__wrapper'>
          <span className='username'>John doe</span>
          <button type='button' className='logoutBtn'>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UserMenu;
