import { useMemo } from 'react';

import { ContextMenuProps } from '../../types';

import './ContextMenu.scss';

const ContextMenu = ({ isOpen, type, children }: ContextMenuProps) => {
  const contextMenuClasses = useMemo(
    () =>
      isOpen
        ? `context-menu ${type === 'article' ? 'article' : ''} show`
        : 'context-menu hide',
    [isOpen, type]
  );

  return (
    <aside
      className={contextMenuClasses}
      role='menu'
      aria-hidden={!isOpen}
      aria-expanded={isOpen}
      aria-label={`${type === 'article' ? 'Article actions' : 'Context'} menu`}
    >
      {children}
    </aside>
  );
};

export default ContextMenu;
