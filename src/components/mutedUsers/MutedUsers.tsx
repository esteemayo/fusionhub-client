import Spinner from '../Spinner';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import { MutedUsersProps } from '../../types';

import './MutedUsers.scss';

const MutedUsers = ({ isPending, error, mutedUsers }: MutedUsersProps) => {
  const noMutedUsers = (mutedUsers ?? []).length < 1;

  return (
    <section
      className='muted-users'
      role='region'
      aria-labelledby='muted-users-heading'
      aria-describedby='muted-users-description'
    >
      <div className='muted-users__container'>
        <AcccountHeader
          title='Muted users'
          subtitle='Review and manage the list of users you’ve muted to maintain a focused and secure environment'
          titleId='muted-users-heading'
          descriptionId='muted-users-description'
        />

        <div className='sr-only' aria-live='polite'>
          {isPending && 'Loading muted users...'}
          {error && 'An error occurred while loading muted users.'}
          {noMutedUsers && !isPending && 'No muted users found.'}
        </div>

        <div className='muted-users__wrapper'>
          {isPending ? (
            <div
              className='muted-users__wrapper--loader'
              role='status'
              aria-busy='true'
            >
              <Spinner />
            </div>
          ) : error ? (
            <EmptyMessage
              title='Error loading data'
              subtitle={error.message || 'Something went wrong.'}
              role='alert'
            />
          ) : noMutedUsers ? (
            <EmptyMessage
              title='No muted users yet'
              subtitle='You have not muted any users.'
            />
          ) : (
            <MutedList type='users' lists={mutedUsers} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MutedUsers;
