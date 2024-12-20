import { Link } from 'react-router-dom';

import './Postbar.scss';

const Postbar = () => {
  return (
    <div className='postbar'>
      <div className='postbar__container'>
        <h1 className='postbar__container--heading'>Posts</h1>
        <div className='postbar__container--breadcrumbs'>
          <ul className='postbar__lists'>
            <li className='postbar__lists--item'>
              <Link to='/' className='postbar__lists--item-link'>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Postbar;
