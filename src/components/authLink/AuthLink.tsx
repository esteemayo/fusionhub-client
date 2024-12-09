import { Link } from 'react-router-dom';

import './AuthLink.scss';

const AuthLink = () => {
  return (
    <div className='authLink'>
      <span className='authLink__text'>
        Don't have an account?{' '}
        <Link to='/register' className='authLink__text--link'>
          Sign up for free
        </Link>
      </span>
    </div>
  );
};

export default AuthLink;
