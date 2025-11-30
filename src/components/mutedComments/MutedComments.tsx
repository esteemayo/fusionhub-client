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
  const noMutedComments = (mutedComments ?? []).length < 1;

  return (
    <section
      className='muted-comments'
      role='region'
      aria-labelledby='muted-comments-heading'
      aria-describedby='muted-comments-description'
    >
      <div className='muted-comments__container'>
        <AcccountHeader
          title='Muted Comments'
          subtitle='View comments you’ve chosen to mute to reduce noise and keep your interactions relevant'
          titleId='muted-comments-heading'
          descriptionId='muted-comments-description'
        />

        <div className='sr-only' aria-live='polite'>
          {isPending && 'Loading muted comments...'}
          {error && 'An error occurred while loading muted comments.'}
          {noMutedComments && !isPending && 'No muted comments found.'}
        </div>

        <div className='muted-comments__wrapper'>
          {isPending ? (
            <div
              className='muted-comments__wrapper--loader'
              role='status'
              aria-busy='true'
              aria-live='polite'
            >
              <Spinner />
            </div>
          ) : error ? (
            <EmptyMessage
              title='Error loading data'
              subtitle={
                error.message ||
                'There was a problem fetching muted comments. Please try refreshing the page or check your internet connection.'
              }
              role='alert'
              aria-live='assertive'
            />
          ) : noMutedComments ? (
            <EmptyMessage
              title='No muted comments yet'
              subtitle='You have not muted any comments.'
            />
          ) : (
            <MutedList type='comments' lists={mutedComments} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MutedComments;
