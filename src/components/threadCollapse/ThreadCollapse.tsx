import { useCallback, useMemo, useRef, useState } from 'react';

import ChevronUpIcon from '../icons/ChevronUpIcon';
import Reply from '../reply/Reply';
import ChevronDownIcon from '../icons/ChevronDownIcon';

import { ThreadCollapseProps } from '../../types';

import './ThreadCollapse.scss';

const ThreadCollapse = ({
  slug,
  activeCardId,
  initialVisible = 1,
  replies,
  onChangeActiveCardId,
}: ThreadCollapseProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      setIsOpen((value) => {
        return !value;
      });

      if (!isOpen) setShowAll(false);
    },
    [isOpen]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowAll(true);
  };

  const visible = useMemo(() => {
    return showAll ? replies : replies.slice(0, initialVisible);
  }, [initialVisible, replies, showAll]);

  const remainingCount = useMemo(
    () => replies.length - visible.length,
    [replies.length, visible.length]
  );

  const btnLabel = useMemo(() => {
    return isOpen
      ? 'Collapse thread'
      : `View ${replies?.length} repl${replies?.length > 1 ? 'ies' : 'y'}`;
  }, [isOpen, replies]);

  const btnMoreLabel = useMemo(() => {
    return `View ${remainingCount} more repl${
      remainingCount > 1 ? 'ies' : 'y'
    }`;
  }, [remainingCount]);

  return (
    <div className='thread-collapse'>
      <button
        type='button'
        className='thread-collapse__toggle-btn'
        onClick={handleToggle}
      >
        {btnLabel}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      <div
        ref={contentRef}
        className='thread-collapse__content'
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
      >
        {visible.map((reply) => {
          return (
            <Reply
              key={reply._id}
              reply={reply}
              slug={slug}
              level={0}
              activeCardId={activeCardId}
              onChangeActiveCardId={onChangeActiveCardId}
            />
          );
        })}

        {isOpen && remainingCount > 0 && (
          <button
            type='button'
            onClick={handleClick}
            aria-label={btnMoreLabel}
            className='thread-collapse__more-btn'
          >
            {btnMoreLabel}
            <ChevronDownIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ThreadCollapse;
