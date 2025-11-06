import { useMemo } from 'react';

import { ContextMenuProps } from '../../types';

import './ContextMenu.scss';

const ContextMenu = ({ isOpen, children }: ContextMenuProps) => {
  const contextMenuClasses = useMemo(() => {
    return isOpen ? 'context-menu show' : 'context-menu hide';
  }, [isOpen]);

  return <aside className={contextMenuClasses}>{children}</aside>;
};

export default ContextMenu;
