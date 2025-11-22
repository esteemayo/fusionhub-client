import { AccountHeaderProps } from '../../types';

import './AccountHeader.scss';

const AcccountHeader = ({ title, subtitle }: AccountHeaderProps) => {
  return (
    <div
      className='account-header'
      aria-labelledby='account-header-title'
      aria-describedby='account-header-subtitle'
    >
      <h2 id='account-header-title' className='account-header__heading'>
        {title}
      </h2>
      <p id='account-header-subtitle' className='account-header__text'>
        {subtitle}
      </p>
    </div>
  );
};

export default AcccountHeader;
