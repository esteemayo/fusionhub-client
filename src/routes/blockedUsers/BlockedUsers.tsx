import EmptyMessage from '../../components/emptyMessage/EmptyMessage';
import Spinner from '../../components/Spinner';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import BlockedUser from '../../components/blockedUser/BlockedUser';

import { useBlockedUsers } from '../../hooks/useBlockedUsers';

import './BlockedUsers.scss';

const BlockedUsers = () => {
  const { isPending, error, blockedUsers } = useBlockedUsers();

  return (
    <section className='blocked-users'>
      <div className='blocked-users__container'>
        <AccountHeading
          title='Blocked User Accounts'
          subtitle='Manage your blocked users to keep your experience secure and distraction-free'
          type='profile'
        />
      </div>
      <div className='blocked-users__wrapper'>
        {isPending ? (
          <div className='blocked-users__wrapper--loader'>
            <Spinner />
          </div>
        ) : (blockedUsers ?? []).length < 1 && !isPending ? (
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
          />
        ) : (
          <div className='blocked-users__box'>
            {blockedUsers?.map((blocked) => {
              return <BlockedUser key={blocked.id} {...blocked} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlockedUsers;
