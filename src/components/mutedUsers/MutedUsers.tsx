import Spinner from '../Spinner';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import { MutedUsersProps } from '../../types';

import './MutedUsers.scss';

const MutedUsers = ({ isPending, error, mutedUsers }: MutedUsersProps) => {
  const noMutedUsers = (mutedUsers ?? []).length < 1;

  return (
    <section className='muted-users'>
      <div className='muted-users__container'>
        <AcccountHeader
          title='Muted users'
          subtitle='Review and manage the list of users you’ve muted to maintain a focused and secure environment'
        />
        <div className='muted-users__wrapper'>
          {isPending ? (
            <div className='muted-users__wrapper--loader'>
              <Spinner />
            </div>
          ) : noMutedUsers && !isPending ? (
            <EmptyMessage
              title='No muted users yet'
              subtitle='This user hasn’t muted any user.'
            />
          ) : error ? (
            <EmptyMessage title='' subtitle={error.message || ''} />
          ) : (
            <MutedList lists={mutedUsers} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MutedUsers;
