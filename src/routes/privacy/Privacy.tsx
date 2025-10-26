import MutedComments from '../../components/mutedComments/MutedComments';
import MutedUsers from '../../components/mutedUsers/MutedUsers';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import MutedReplies from '../../components/mutedReplies/MutedReplies';

import './Privacy.scss';

const Privacy = () => {
  return (
    <section className='privacy'>
      <div className='privacy__container'>
        <AccountHeading
          title='Account Privacy Settings'
          subtitle='Manage your account’s privacy and communication preferences to keep your experience secure and distraction-free'
          type='profile'
        />
      </div>
      <MutedUsers />
      <MutedComments />
      <MutedReplies />
    </section>
  );
};

export default Privacy;
