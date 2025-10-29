import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import { MutedRepliesProps } from '../../types';

import './MutedReplies.scss';

const MutedReplies = ({ mutedReplies }: MutedRepliesProps) => {
  return (
    <section className='muted-replies'>
      <div className='muted-replies__container'>
        <AcccountHeader
          title='Muted Replies'
          subtitle='Manage muted replies to ensure your discussions stay on-topic and aligned with your preferences'
        />
        <div className='muted-replies__wrapper'>
          <MutedList lists={mutedReplies} />
        </div>
      </div>
    </section>
  );
};

export default MutedReplies;
