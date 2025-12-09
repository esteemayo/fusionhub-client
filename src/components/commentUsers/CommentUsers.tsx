import { useMemo } from 'react';

import UsersIcon from '../icons/UsersIcon';
import { CommentUsersProps } from '../../types';

import './CommentUsers.scss';

const CommentUsers = ({ total, isLoading }: CommentUsersProps) => {
  const containerClasses = useMemo(
    () => (!isLoading ? 'comment-users show' : 'comment-users hide'),
    [isLoading]
  );

  return (
    <div
      className={containerClasses}
      role='status'
      aria-live='polite'
      aria-label={
        typeof total === 'number'
          ? `${total} user${total === 1 ? '' : 's'} commented`
          : 'Loading comment users'
      }
    >
      <UsersIcon />

      <span className='comment-users__total' aria-hidden='true'>
        {total}
      </span>
    </div>
  );
};

export default CommentUsers;
