import './ContextMenuList.scss';

const ContextMenuList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul role='list' className='context-menu-list'>
      {children}
    </ul>
  );
};

export default ContextMenuList;
