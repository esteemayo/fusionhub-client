import { AccountHeaderProps } from '../../types';

import './AccountHeader.scss';

const AcccountHeader = ({ title, subtitle }: AccountHeaderProps) => {
  return (
    <div className='accountHeader'>
      <h2 className='accountHeader__heading'>{title}</h2>
      <span className='accountHeader__text'>{subtitle}</span>
    </div>
  );
};

export default AcccountHeader;
