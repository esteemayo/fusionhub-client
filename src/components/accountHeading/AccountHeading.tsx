import { useMemo } from 'react';

import { AccountHeadingProps } from '../../types';

import './AccountHeading.scss';

const AccountHeading = ({ title, subtitle, type }: AccountHeadingProps) => {
  const accountHeadingClasses = useMemo(
    () => (type !== 'profile' ? 'account-heading mb' : 'account-heading'),
    [type]
  );

  return (
    <div
      className={accountHeadingClasses}
      aria-labelledby='account-heading-title'
      aria-describedby='account-heading-subtitle'
    >
      <h1 id='account-heading-title' className='account-heading--header'>
        {title}
      </h1>
      <p id='account-heading-subtitle' className='account-heading--text'>
        {subtitle}
      </p>
    </div>
  );
};

export default AccountHeading;
