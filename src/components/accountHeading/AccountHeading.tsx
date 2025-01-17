import { useMemo } from 'react';

import { AccountHeadingProps } from '../../types';

import './AccountHeading.scss';

const AccountHeading = ({ title, subtitle, type }: AccountHeadingProps) => {
  const accountHeadingClasses = useMemo(() => {
    return type !== 'profile' ? 'accountHeading mb' : 'accountHeading';
  }, [type]);

  return (
    <div className={accountHeadingClasses}>
      <h1 className='accountHeading--header'>{title}</h1>
      <span className='accountHeading--text'>{subtitle}</span>
    </div>
  );
};

export default AccountHeading;
