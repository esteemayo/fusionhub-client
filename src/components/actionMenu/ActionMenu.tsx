import { ActionMenuProps } from '../../types';

import './ActionMenu.scss';

const ActionMenu = ({
  label,
  isLoading,
  onAction,
  children,
  ...ariaProps
}: ActionMenuProps) => {
  return (
    <div className='action-menu' role='none'>
      <button
        {...ariaProps}
        type='button'
        role='menuitem'
        className='action-menu__btn'
        onClick={onAction}
        disabled={isLoading}
        aria-label={ariaProps['aria-label'] ?? label}
        aria-disabled={ariaProps['aria-disabled'] ?? isLoading}
      >
        <span aria-hidden='true'>{children}</span>

        <span className='action-menu__btn--label'>{label}</span>

        {isLoading && (
          <span
            className='action-menu__btn--loader success'
            role='status'
            aria-live='polite'
          >
            (in progress)
          </span>
        )}
      </button>
    </div>
  );
};

export default ActionMenu;
