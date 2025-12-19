import { useEffect, useMemo, useRef } from 'react';
import { ContextMenuProps } from '../../types';

import './ContextMenu.scss';

const ContextMenu = ({ isOpen, type, onClose, children }: ContextMenuProps) => {
  const menuRef = useRef<HTMLElement>(null);

  const contextMenuClasses = useMemo(
    () =>
      isOpen
        ? `context-menu ${type === 'article' ? 'article' : ''} ${
            type === 'feature' ? 'feature' : ''
          } show`
        : 'context-menu hide',
    [isOpen, type]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <aside
      ref={menuRef}
      className={contextMenuClasses}
      role='menu'
      aria-expanded={isOpen}
      aria-label={`${type === 'article' ? 'Article actions' : 'Context'} menu`}
    >
      {children}
    </aside>
  );
};

export default ContextMenu;
