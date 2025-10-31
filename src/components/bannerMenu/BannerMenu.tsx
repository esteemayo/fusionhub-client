import BannerMenuList from '../bannerMenuList/BannerMenuList';

import { BannerMenuProps } from '../../types';

import './BannerMenu.scss';

const BannerMenu = ({
  isOpen,
  banner,
  query,
  username,
  isBlocked,
  disabled,
  onToggle,
  onMute,
  onReport,
  onBlock,
  onRemoveBanner,
  onRemoveAvatar,
  onDeactivate,
}: BannerMenuProps) => {
  return (
    <div className='banner-menu'>
      <button
        type='button'
        onClick={onToggle}
        disabled={disabled}
        aria-label={`${isOpen ? 'Open' : 'Close'} menu`}
        aria-disabled={disabled}
        className='banner-menu__btn'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
          />
        </svg>
      </button>
      <BannerMenuList
        isOpen={isOpen}
        banner={banner}
        query={query}
        username={username}
        isBlocked={isBlocked}
        onMute={onMute}
        onReport={onReport}
        onBlock={onBlock}
        onRemoveBanner={onRemoveBanner}
        onRemoveAvatar={onRemoveAvatar}
        onDeactivate={onDeactivate}
      />
    </div>
  );
};

export default BannerMenu;
