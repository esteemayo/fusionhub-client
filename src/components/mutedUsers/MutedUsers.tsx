import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import './MutedUsers.scss';

const MutedUsers = () => {
  return (
    <section className='muted-users'>
      <div className='muted-users__container'>
        <AcccountHeader
          title='Muted users'
          subtitle='Reiew and manage the list of users you’ve muted to maintain a focused and secure environment'
        />
        <div className='muted-users__wrapper'>
          <MutedList />
        </div>
      </div>
    </section>
  );
};

export default MutedUsers;
