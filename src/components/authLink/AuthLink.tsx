import { Link } from 'react-router-dom';

import { AuthLinkProps } from '../../types';

import './AuthLink.scss';

const AuthLink = ({ url, label, urlLabel }: AuthLinkProps) => {
  return (
    <div className='auth-link'>
      <div className='auth-link__text'>
        <span className='auth-link__text--label'>{label}</span>
        <Link to={`/${url}`} className='auth-link__text--link'>
          {urlLabel}
        </Link>
      </div>
    </div>
  );
};

export default AuthLink;
