import { useMemo } from 'react';

import { AccountHeadingProps } from '../../types';

import './AccountHeading.scss';

const AccountHeading = ({ title, subtitle, type }: AccountHeadingProps) => {
  const accountHeadingClasses = useMemo(() => {
    return type !== 'profile' ? 'account-heading mb' : 'account-heading';
  }, [type]);

  return (
    <div className={accountHeadingClasses}>
      <h1 className='account-heading--header'>{title}</h1>
      <span className='account-heading--text'>{subtitle}</span>
    </div>
  );
};

export default AccountHeading;
