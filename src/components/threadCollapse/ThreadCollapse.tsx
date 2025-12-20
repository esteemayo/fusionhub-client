import { useCallback, useMemo, useRef, useState } from 'react';

import ChevronUpIcon from '../icons/ChevronUpIcon';
import Reply from '../reply/Reply';
import ChevronDownIcon from '../icons/ChevronDownIcon';

import { ThreadCollapseProps } from '../../types';
import { useReplyCollapseState } from '../../hooks/useReplyCollapseState';

import './ThreadCollapse.scss';

const ThreadCollapse = ({
  slug,
  initialVisible = 1,
  replies,
}: ThreadCollapseProps) => {
  const firstReplyId = replies[0]._id;
  const { isOpen, setIsOpen } = useReplyCollapseState(firstReplyId);

  const contentRef = useRef<HTMLDivElement>(null);

  const [showAll, setShowAll] = useState(false);

  const handleToggle = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();

      setIsOpen((value) => {
        return !value;
      });

      if (!isOpen) setShowAll(false);
    },
    [isOpen, setIsOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowAll(true);
  };

  const visible = useMemo(
    () => (showAll ? replies : replies.slice(0, initialVisible)),
    [initialVisible, replies, showAll]
  );

  const remainingCount = useMemo(
    () => replies.length - visible.length,
    [replies.length, visible.length]
  );

  const btnLabel = useMemo(
    () =>
      isOpen
        ? 'Collapse thread'
        : `View ${replies?.length} repl${replies?.length > 1 ? 'ies' : 'y'}`,
    [isOpen, replies]
  );

  const btnMoreLabel = useMemo(
    () => `View ${remainingCount} more repl${remainingCount > 1 ? 'ies' : 'y'}`,
    [remainingCount]
  );

  return (
    <div role='group' className='thread-collapse' aria-label='Replies thread'>
      <button
        type='button'
        id={`thread-toggle-${firstReplyId}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`thread-content-${firstReplyId}`}
        className='thread-collapse__toggle-btn'
      >
        <span>{btnLabel}</span>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      <div
        id={`thread-content-${firstReplyId}`}
        ref={contentRef}
        role='region'
        aria-labelledby={`thread-toggle-${firstReplyId}`}
        className='thread-collapse__content'
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
        }}
      >
        {visible.map((reply) => {
          return <Reply key={reply._id} reply={reply} slug={slug} level={0} />;
        })}

        {isOpen && remainingCount > 0 && (
          <button
            type='button'
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={btnMoreLabel}
            className='thread-collapse__more-btn'
          >
            <span>{btnMoreLabel}</span>
            <ChevronDownIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ThreadCollapse;
