import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import { MutedCommentsProps } from '../../types';

import './MutedComments.scss';

const MutedComments = ({ mutedComments }: MutedCommentsProps) => {
  return (
    <section className='muted-comments'>
      <div className='muted-comments__container'>
        <AcccountHeader
          title='Muted Comments'
          subtitle='View comments you’ve chosen to mute to reduce noise and keep your interactions relevant'
        />
        <div className='muted-users__wrapper'>
          <MutedList lists={mutedComments} />
        </div>
      </div>
    </section>
  );
};

export default MutedComments;
