import { useMemo } from 'react';

import { EmptyMessageProps } from '../../types';

import './EmptyMessage.scss';

const EmptyMessage = ({ title, subtitle, center, type }: EmptyMessageProps) => {
  const emptyMsgClasses = useMemo(() => {
    return center
      ? 'empty-message center'
      : type === 'comment'
      ? 'empty-message hide'
      : 'empty-message';
  }, [center, type]);

  return (
    <div className={emptyMsgClasses}>
      <span>{title}</span>
      <span>{subtitle}</span>
    </div>
  );
};

export default EmptyMessage;
