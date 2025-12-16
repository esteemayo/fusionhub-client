import MutedComments from '../../components/mutedComments/MutedComments';
import MutedUsers from '../../components/mutedUsers/MutedUsers';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import MutedReplies from '../../components/mutedReplies/MutedReplies';

import { useMute } from '../../hooks/useMute';

import './Privacy.scss';

const Privacy = () => {
  const { isPending, error, mutedList } = useMute();

  return (
    <main
      className='privacy'
      role='main'
      aria-labelledby='privacy-heading'
      aria-describedby='privacy-description'
    >
      <div className='privacy__container'>
        <AccountHeading
          title='Account Privacy Settings'
          subtitle='Manage your account’s privacy and communication preferences to keep your experience secure and distraction-free'
          type='profile'
          titleId='privacy-heading'
          descriptionId='privacy-description'
        />
      </div>

      <div className='sr-only' aria-live='polite'>
        {isPending && 'Loading privacy information...'}
        {error && 'An error occurred while loading your privacy settings.'}
      </div>

      <section
        className='privacy__section'
        aria-labelledby='muted-users-heading'
      >
        <h2 id='muted-users-heading' className='sr-only'>
          Muted Users
        </h2>

        <MutedUsers
          isPending={isPending}
          error={error}
          mutedUsers={mutedList?.mutedUsers}
        />
      </section>

      <section
        className='privacy__section'
        aria-labelledby='muted-comments-heading'
      >
        <h2 id='muted-comments-heading' className='sr-only'>
          Muted Comments
        </h2>

        <MutedComments
          isPending={isPending}
          error={error}
          mutedComments={mutedList?.mutedComments}
        />
      </section>

      <section
        className='privacy__section'
        aria-labelledby='muted-replies-heading'
      >
        <h2 id='muted-replies-heading' className='sr-only'>
          Muted Replies
        </h2>

        <MutedReplies
          isPending={isPending}
          error={error}
          mutedReplies={mutedList?.mutedReplies}
        />
      </section>
    </main>
  );
};

export default Privacy;
