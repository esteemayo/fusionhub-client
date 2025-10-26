import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import './MutedReplies.scss';

const MutedReplies = () => {
  return (
    <section className='muted-replies'>
      <div className='muted-replies__container'>
        <AcccountHeader
          title='Muted Replies'
          subtitle='Manage muted replies to ensure your discussions stay on-topic and aligned with your preferences'
        />
        <div className='muted-replies__wrapper'>
          <MutedList />
        </div>
      </div>
    </section>
  );
};

export default MutedReplies;
