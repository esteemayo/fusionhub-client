import { useId, useMemo } from 'react';
import { EmptyMessageProps } from '../../types';

import './EmptyMessage.scss';

const EmptyMessage = ({
  title,
  subtitle,
  center,
  type,
  role,
  ...ariaProps
}: EmptyMessageProps) => {
  const titleId = useId();
  const subtitleId = useId();

  const emptyMsgClasses = useMemo(
    () =>
      center
        ? 'empty-message center'
        : type === 'comment'
        ? 'empty-message hide'
        : 'empty-message',
    [center, type]
  );

  role = role ?? title.toLowerCase().includes('error') ? 'alert' : 'status';

  return (
    <div
      className={emptyMsgClasses}
      role={role}
      aria-live='polite'
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
      {...ariaProps}
    >
      <span id={titleId} className='empty-message__title'>
        {title}
      </span>
      <span id={subtitleId} className='empty-message__subtitle'>
        {subtitle}
      </span>
    </div>
  );
};

export default EmptyMessage;
