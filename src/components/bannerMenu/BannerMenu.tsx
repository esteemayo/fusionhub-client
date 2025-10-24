import BannerMenuList from '../bannerMenuList/BannerMenuList';

import { BannerMenuProps } from '../../types';

import './BannerMenu.scss';

const BannerMenu = ({
  isOpen,
  query,
  username,
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
        aria-label={`${isOpen ? 'Open' : 'Close'} menu`}
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
        query={query}
        username={username}
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
