import { Link } from 'react-router-dom';

import { AuthLinkProps } from '../../types';

import './AuthLink.scss';

const AuthLink = ({ url, label, urlLabel }: AuthLinkProps) => {
  return (
    <div className='auth-link'>
      <span className='auth-link__text'>
        {label}{' '}
        <Link to={`/${url}`} className='auth-link__text--link'>
          {urlLabel}
        </Link>
      </span>
    </div>
  );
};

export default AuthLink;
