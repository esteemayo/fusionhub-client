import { useMemo } from 'react';

import ThreadCollapse from '../threadCollapse/ThreadCollapse';

import { useMute } from '../../hooks/useMute';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';

import { RepliesProps } from '../../types';

import './Replies.scss';

const Replies = ({
  slug,
  activeCardId,
  replyLists,
  onChangeActiveCardId,
}: RepliesProps) => {
  const { mutedList } = useMute();
  const { blockedUsers } = useBlockedUsers();

  const visibleReplies = useMemo(() => {
    return (replyLists ?? []).filter(
      (reply) =>
        !(blockedUsers ?? []).some((user) => user.id === reply.author._id) ||
        !(mutedList?.mutedReplies ?? []).some((entry) => entry.id === reply._id)
    );
  }, [blockedUsers, mutedList?.mutedReplies, replyLists]);

  if ((replyLists ?? [])?.length < 1) {
    return null;
  }

  return (
    <div className='replies'>
      <div className='replies__container'>
        <ThreadCollapse
          slug={slug}
          activeCardId={activeCardId}
          initialVisible={1}
          replies={visibleReplies}
          onChangeActiveCardId={onChangeActiveCardId}
        />
      </div>
    </div>
  );
};

export default Replies;
