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
        aria-label={`${isOpen ? 'Open' : 'Close'} menu`}
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
