import ThreadCollapse from '../threadCollapse/ThreadCollapse';

import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { useMute } from '../../hooks/useMute';
import { useVisibleReplies } from '../../hooks/useVisibleReplies';

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

  const visibleReplies = useVisibleReplies(
    replyLists,
    blockedUsers,
    mutedList?.mutedReplies
  );

  if (visibleReplies.length < 1) return null;

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
