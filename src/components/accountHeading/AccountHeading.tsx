import { AccountHeadingProps } from '../../types';

import './AccountHeading.scss';

const AccountHeading = ({ title, subtitle }: AccountHeadingProps) => {
  return (
    <div className='accountHeading'>
      <h1 className='accountHeading--header'>{title}</h1>
      <span className='accountHeading--text'>{subtitle}</span>
    </div>
  );
};

export default AccountHeading;
