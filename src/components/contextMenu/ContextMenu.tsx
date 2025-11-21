import { useMemo } from 'react';

import { ContextMenuProps } from '../../types';

import './ContextMenu.scss';

const ContextMenu = ({ isOpen, type, children }: ContextMenuProps) => {
  const contextMenuClasses = useMemo(() => {
    return isOpen
      ? `context-menu ${type === 'article' ? 'article' : ''} show`
      : 'context-menu hide';
  }, [isOpen, type]);

  return <aside className={contextMenuClasses}>{children}</aside>;
};

export default ContextMenu;
