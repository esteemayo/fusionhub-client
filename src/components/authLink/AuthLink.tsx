import { Link } from 'react-router-dom';

import { AuthLinkProps } from '../../types';

import './AuthLink.scss';

const AuthLink = ({ url, label, urlLabel }: AuthLinkProps) => {
  return (
    <div className='authLink'>
      <span className='authLink__text'>
        {label}{' '}
        <Link to={`/${url}`} className='authLink__text--link'>
          {urlLabel}
        </Link>
      </span>
    </div>
  );
};

export default AuthLink;
