import BannerMenuList from '../bannerMenuList/BannerMenuList';
import HorizontalEllipsisIcon from '../icons/HorizontalEllipsisIcon';

import { BannerMenuProps } from '../../types';

import './BannerMenu.scss';

const BannerMenu = ({
  role,
  isOpen,
  image,
  banner,
  query,
  username,
  isBlocked,
  isMuted,
  disabled,
  onToggle,
  onShare,
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
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
        aria-pressed={isOpen}
        aria-disabled={disabled}
        className='banner-menu__btn'
      >
        <HorizontalEllipsisIcon />
      </button>
      <BannerMenuList
        role={role}
        isOpen={isOpen}
        image={image}
        banner={banner}
        query={query}
        username={username}
        isBlocked={isBlocked}
        isMuted={isMuted}
        onShare={onShare}
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
