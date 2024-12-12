import { useMemo } from 'react';

import { useAppSelector } from '../../hooks/hooks';

import './Sidebar.scss';

const Sidebar = () => {
  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));

  const sidebarClasses = useMemo(() => {
    return isOpen ? 'sidebar show' : 'sidebar hide';
  }, [isOpen]);

  return (
    <aside className={sidebarClasses}>
      <div className='sidebar__container'>Sidebar</div>
    </aside>
  );
};

export default Sidebar;
