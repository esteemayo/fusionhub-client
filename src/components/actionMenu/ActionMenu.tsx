import { ActionMenuProps } from '../../types';

import './ActionMenu.scss';

const ActionMenu = ({
  label,
  isLoading,
  onAction,
  children,
}: ActionMenuProps) => {
  return (
    <div className='action-menu'>
      <button
        type='button'
        className='action-menu__btn'
        onClick={onAction}
        disabled={isLoading}
      >
        {children}
        <span className='action-menu__btn--label'>{label}</span>
        {isLoading && (
          <span className='action-menu__btn--loader success'>
            (in progress)
          </span>
        )}
      </button>
    </div>
  );
};

export default ActionMenu;
