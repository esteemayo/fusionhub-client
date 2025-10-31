import BlockedUser from '../../components/blockedUser/BlockedUser';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import './BlockedUsers.scss';

const BlockedUsers = () => {
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
        <div className='blocked-users__box'>
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
        </div>
      </div>
    </section>
  );
};

export default BlockedUsers;
