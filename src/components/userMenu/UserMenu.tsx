import { Link } from 'react-router-dom';

import './UserMenu.scss';

const UserMenu = () => {
  return (
    <aside className='userMenu'>
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
