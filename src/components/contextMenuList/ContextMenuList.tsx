import './ContextMenuList.scss';

const ContextMenuList = ({ children }: { children: React.ReactNode }) => {
  return <ul className='context-menu-list'>{children}</ul>;
};

export default ContextMenuList;
