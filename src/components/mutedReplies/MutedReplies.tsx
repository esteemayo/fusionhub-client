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
  const noMutedReplies = (mutedReplies ?? []).length < 1;

  return (
    <section
      className='muted-replies'
      role='region'
      aria-labelledby='muted-replies-heading'
      aria-describedby='muted-replies-description'
    >
      <div className='muted-replies__container'>
        <AcccountHeader
          title='Muted Replies'
          subtitle='Manage muted replies to ensure your discussions stay on-topic and aligned with your preferences'
          titleId='muted-replies-heading'
          descriptionId='muted-replies-description'
        />

        <div className='sr-only' aria-live='polite'>
          {isPending && 'Loading muted replies...'}
          {error && 'An error occurred while loading muted replies.'}
          {noMutedReplies && !isPending && 'No muted replies found.'}
        </div>

        <div className='muted-replies__wrapper'>
          {isPending ? (
            <div
              className='muted-replies__wrapper--loader'
              role='status'
              aria-busy='true'
            >
              <Spinner />
            </div>
          ) : error ? (
            <EmptyMessage
              title='Error loading data'
              subtitle={
                error.message ||
                'There was a problem fetching muted replies. Please try refreshing the page or check your internet connection.'
              }
              role='alert'
              aria-live='assertive'
            />
          ) : noMutedReplies && !isPending ? (
            <EmptyMessage
              title='No muted replies yet'
              subtitle='You have not muted any replies.'
            />
          ) : (
            <MutedList type='replies' lists={mutedReplies} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MutedReplies;
