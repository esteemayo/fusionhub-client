import Spinner from '../Spinner';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import { MutedRepliesProps } from '../../types';

import './MutedReplies.scss';

const MutedReplies = ({
  isPending,
  error,
  mutedReplies,
}: MutedRepliesProps) => {
  return (
    <section className='muted-replies'>
      <div className='muted-replies__container'>
        <AcccountHeader
          title='Muted Replies'
          subtitle='Manage muted replies to ensure your discussions stay on-topic and aligned with your preferences'
        />
        <div className='muted-replies__wrapper'>
          {isPending ? (
            <div className='muted-replies__wrapper--loader'>
              <Spinner />
            </div>
          ) : (mutedReplies ?? []).length < 1 && !isPending ? (
            <EmptyMessage
              title='No muted replies yet'
              subtitle='This user hasn’t muted any user.'
            />
          ) : error ? (
            <EmptyMessage title='' subtitle={error.message || ''} />
          ) : (
            <MutedList lists={mutedReplies} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MutedReplies;
