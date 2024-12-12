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
          <li className='userMenu__list--item'>
            <span>John doe</span>
          </li>
          <li className='userMenu__list--item'>
            <button type='button'>Logout</button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default UserMenu;
