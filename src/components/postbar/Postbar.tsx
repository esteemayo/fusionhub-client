import { Link } from 'react-router-dom';

import './Postbar.scss';

const Postbar = () => {
  return (
    <div className='postbar'>
      <div className='postbar__container'>
        <div className='postbar__wrapper'>
          <h1 className='postbar__wrapper--heading'>Posts</h1>
          <div className='postbar__wrapper--breadcrumbs'>
            <ul className='postbar__lists'>
              <li className='postbar__lists--item'>
                Home
                {/* <Link to='/' className='postbar__lists--item'>
                </Link> */}
              </li>
              <span>|</span>
              <li className='postbar__lists--item'>
                Posts
                {/* <Link to='/posts' className='postbar__lists--item'>
                </Link> */}
              </li>
              <span>|</span>
              <li className='postbar__lists--item'>
                Left sidebar
                {/* <Link to='#leftSidebar' className='postbar__lists--item'>
                </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postbar;
