import './ContextMenuList.scss';

const ContextMenuList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul
      className='context-menu-list'
      role='menu'
      aria-label='Context menu options'
    >
      {children}
    </ul>
  );
};

export default ContextMenuList;
