import ThreadCollapse from '../threadCollapse/ThreadCollapse';

import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { useMute } from '../../hooks/useMute';
import { useVisibleReplies } from '../../hooks/useVisibleReplies';

import { RepliesProps } from '../../types';

import './Replies.scss';

const Replies = ({ slug, isLoading, replyLists }: RepliesProps) => {
  const { mutedList } = useMute();
  const { blockedUsers } = useBlockedUsers();

  const visibleReplies = useVisibleReplies(
    replyLists,
    blockedUsers,
    mutedList?.mutedReplies
  );

  if (visibleReplies.length < 1) return null;

  return (
    <section aria-labelledby={`replies-heading-${slug}`} className='replies'>
      <h4 id={`replies-heading-${slug}`} className='sr-only'>
        Replies section
      </h4>

      {isLoading ? (
        <span className='replies__loader'>loading...</span>
      ) : (
        <div className='replies__container'>
          <ThreadCollapse
            slug={slug}
            initialVisible={1}
            replies={visibleReplies}
          />
        </div>
      )}
    </section>
  );
};

export default Replies;
