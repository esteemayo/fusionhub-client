import Spinner from '../Spinner';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import MutedList from '../mutedList/MutedList';
import AcccountHeader from '../accountHeader/AccountHeader';

import { MutedCommentsProps } from '../../types';

import './MutedComments.scss';

const MutedComments = ({
  isPending,
  error,
  mutedComments,
}: MutedCommentsProps) => {
  return (
    <section className='muted-comments'>
      <div className='muted-comments__container'>
        <AcccountHeader
          title='Muted Comments'
          subtitle='View comments you’ve chosen to mute to reduce noise and keep your interactions relevant'
        />
        <div className='muted-comments__wrapper'>
          {isPending ? (
            <div className='muted-comments__wrapper--loader'>
              <Spinner />
            </div>
          ) : (mutedComments ?? []).length < 1 && !isPending ? (
            <EmptyMessage
              title='No muted comment yet'
              subtitle='This user hasn’t muted any comment.'
            />
          ) : error ? (
            <EmptyMessage title='' subtitle={error.message || ''} />
          ) : (
            <MutedList lists={mutedComments} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MutedComments;
