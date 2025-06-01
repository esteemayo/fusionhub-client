import { useMemo } from 'react';

import { EmptyMessageProps } from '../../types';

import './EmptyMessage.scss';

const EmptyMessage = ({ title, subtitle, center }: EmptyMessageProps) => {
  const emptyMsgClasses = useMemo(() => {
    return center ? 'empty-message center' : 'empty-message';
  }, [center]);

  return (
    <div className={emptyMsgClasses}>
      <span>{title}</span>
      <span>{subtitle}</span>
    </div>
  );
};

export default EmptyMessage;
