import ArticleMenuList from './ArticleMenuList';
import ContextMenu from './contextMenu/ContextMenu';

import { ArticleMenuProps } from '../types';

const ArticleMenu = ({
  isOpen,
  onClose,
  onDelete,
  onUpdate,
}: ArticleMenuProps) => {
  return (
    <ContextMenu isOpen={isOpen} onClose={onClose} type='article'>
      <ArticleMenuList onDelete={onDelete} onUpdate={onUpdate} />
    </ContextMenu>
  );
};

export default ArticleMenu;
