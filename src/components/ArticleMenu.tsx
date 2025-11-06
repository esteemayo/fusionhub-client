import ContextMenu from './contextMenu/ContextMenu';
import ArticleMenuList from './ArticleMenuList';

import { ArticleMenuProps } from '../types';

const ArticleMenu = ({ isOpen, onDelete, onUpdate }: ArticleMenuProps) => {
  return (
    <ContextMenu isOpen={isOpen}>
      <ArticleMenuList onDelete={onDelete} onUpdate={onUpdate} />
    </ContextMenu>
  );
};

export default ArticleMenu;
