import { useMemo } from 'react';

import { AccountHeadingProps } from '../../types';

import './AccountHeading.scss';

const AccountHeading = ({
  title,
  subtitle,
  type,
  titleId,
  descriptionId,
}: AccountHeadingProps) => {
  const accountHeadingClasses = useMemo(
    () => (type !== 'profile' ? 'account-heading mb' : 'account-heading'),
    [type]
  );

  return (
    <div
      className={accountHeadingClasses}
      aria-labelledby={titleId ?? 'account-heading-title'}
      aria-describedby={descriptionId ?? 'account-heading-subtitle'}
    >
      <h1
        id={titleId ?? 'account-heading-title'}
        className='account-heading--header'
      >
        {title}
      </h1>
      <p
        id={descriptionId ?? 'account-heading-subtitle'}
        className='account-heading--text'
      >
        {subtitle}
      </p>
    </div>
  );
};

export default AccountHeading;
