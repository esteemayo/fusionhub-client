import { useCallback, useEffect, useMemo, useRef } from 'react';

import ShareIcon from '../icons/ShareIcon';
import MuteIcon from '../icons/MuteIcon';
import ReportIcon from '../icons/ReportIcon';
import BlockIcon from '../icons/BlockIcon';
import DeactivateIcon from '../icons/DeactivateIcon';
import TrashIcon from '../icons/TrashIcon';
import RemoveAvatarIcon from '../icons/RemoveAvatarIcon';

import { BannerMenuListProps } from '../../types';
import BannerMenuListItem from '../bannerMenuListItem/BannerMenuListItem';

import './BannerMenuList.scss';

const BannerMenuList = ({
  role,
  isOpen,
  image,
  banner,
  query,
  username,
  isBlocked,
  isMuted,
  onClose,
  onShare,
  onMute,
  onReport,
  onBlock,
  onRemoveBanner,
  onRemoveAvatar,
  onDeactivate,
}: BannerMenuListProps) => {
  const menuRef = useRef<HTMLUListElement>(null);

  const itemLabel = useCallback(
    (label: string) => `${label} @${username}`,
    [username]
  );

  const menuListClasses = useMemo(
    () => (isOpen ? 'banner-menu-list show' : 'banner-menu-list hide'),
    [isOpen]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <ul
      ref={menuRef}
      className={menuListClasses}
      role='menu'
      aria-hidden={!isOpen}
      aria-expanded={isOpen}
      aria-label='Banner menu options'
    >
      {query && (
        <>
          {!isBlocked && (
            <BannerMenuListItem label={itemLabel('Share')} onAction={onShare}>
              <ShareIcon />
            </BannerMenuListItem>
          )}

          {role !== 'admin' && (
            <>
              {!isBlocked && (
                <>
                  <BannerMenuListItem
                    label={itemLabel(isMuted ? 'Unmute' : 'Mute')}
                    onAction={onMute}
                  >
                    <MuteIcon />
                  </BannerMenuListItem>

                  <BannerMenuListItem
                    label={itemLabel('Report')}
                    onAction={onReport}
                  >
                    <ReportIcon />
                  </BannerMenuListItem>
                </>
              )}

              <BannerMenuListItem
                type='danger'
                label={itemLabel(isBlocked ? 'Unblock' : 'Block')}
                onAction={onBlock}
              >
                <BlockIcon />
              </BannerMenuListItem>
            </>
          )}
        </>
      )}

      {!query && (
        <>
          {banner && (
            <BannerMenuListItem label='Remove Banner' onAction={onRemoveBanner}>
              <TrashIcon />
            </BannerMenuListItem>
          )}

          {image && (
            <BannerMenuListItem label='Remove Avatar' onAction={onRemoveAvatar}>
              <RemoveAvatarIcon />
            </BannerMenuListItem>
          )}

          <BannerMenuListItem
            type='danger'
            label='Deactivate'
            onAction={onDeactivate}
          >
            <DeactivateIcon />
          </BannerMenuListItem>
        </>
      )}
    </ul>
  );
};

export default BannerMenuList;
