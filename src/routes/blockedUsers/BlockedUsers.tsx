import EmptyMessage from '../../components/emptyMessage/EmptyMessage';
import Spinner from '../../components/Spinner';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import BlockedUser from '../../components/blockedUser/BlockedUser';

import { useBlockedUsers } from '../../hooks/useBlockedUsers';

import './BlockedUsers.scss';

const BlockedUsers = () => {
  const { isPending, error, blockedUsers } = useBlockedUsers();
  const noBlockedUsers = (blockedUsers ?? []).length < 1;

  return (
    <section
      className='blocked-users'
      role='region'
      aria-labelledby='blocked-users-heading'
      aria-describedby='blocked-users-description'
    >
      <div className='blocked-users__container'>
        <AccountHeading
          title='Blocked User Accounts'
          subtitle='Manage your blocked users to keep your experience secure and distraction-free'
          type='profile'
          titleId='blocked-users-heading'
          descriptionId='blocked-users-description'
        />

        <div className='sr-only' aria-live='polite'>
          {isPending && 'Loading blocked users...'}
          {error && 'An error occurred while loading blocked users.'}
          {noBlockedUsers && !isPending && 'No muted users found.'}
        </div>
      </div>
      <div className='blocked-users__wrapper'>
        {isPending ? (
          <div
            className='blocked-users__wrapper--loader'
            role='status'
            aria-busy='true'
            aria-live='polite'
          >
            <Spinner />
          </div>
        ) : noBlockedUsers && !isPending ? (
          <EmptyMessage
            title='No blocked users yet'
            subtitle='This user hasn’t blocked any user.'
          />
        ) : error ? (
          <EmptyMessage
            title='Unable to load blocked users'
            subtitle={
              error.message ||
              'There was a problem fetching blocked users. Please try refreshing the page or check your internet connection.'
            }
            role='alert'
            aria-live='assertive'
          />
        ) : (
          <div className='blocked-users__box' role='list'>
            {blockedUsers?.map((blocked) => {
              return (
                <div
                  key={blocked.id}
                  className='blocked-users__box--item'
                  role='listitem'
                >
                  <BlockedUser {...blocked} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlockedUsers;
