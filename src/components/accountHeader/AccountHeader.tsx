import { AccountHeaderProps } from '../../types';

import './AccountHeader.scss';

const AcccountHeader = ({ title, subtitle }: AccountHeaderProps) => {
  return (
    <div className='account-header'>
      <h2 className='account-header__heading'>{title}</h2>
      <span className='account-header__text'>{subtitle}</span>
    </div>
  );
};

export default AcccountHeader;
