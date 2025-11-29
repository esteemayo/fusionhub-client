import { AccountHeaderProps } from '../../types';

import './AccountHeader.scss';

const AcccountHeader = ({
  title,
  subtitle,
  titleId,
  descriptionId,
}: AccountHeaderProps) => {
  return (
    <div
      className='account-header'
      aria-labelledby={titleId ?? 'account-header-title'}
      aria-describedby={descriptionId ?? 'account-header-subtitle'}
    >
      <h2
        id={titleId ?? 'account-header-title'}
        className='account-header__heading'
      >
        {title}
      </h2>
      <p
        id={descriptionId ?? 'account-header-subtitle'}
        className='account-header__text'
      >
        {subtitle}
      </p>
    </div>
  );
};

export default AcccountHeader;
