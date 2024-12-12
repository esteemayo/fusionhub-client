import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';

import './Sidebar.scss';

const Sidebar = () => {
  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));

  const sidebarClasses = useMemo(() => {
    return isOpen ? 'sidebar show' : 'sidebar hide';
  }, [isOpen]);

  return (
    <aside className={sidebarClasses}>
      <div className='sidebar__container'>
        <div className='sidebar__wrapper'>
          <div className='sidebar__logo'>
            <Link to='/'>Logo</Link>
          </div>
          <button className='sidebar__closeBtn'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
