import { useCallback, useMemo } from 'react';

import ShareIcon from '../icons/ShareIcon';
import MuteIcon from '../icons/MuteIcon';
import ReportIcon from '../icons/ReportIcon';
import BlockIcon from '../icons/BlockIcon';
import DeactivateIcon from '../icons/DeactivateIcon';
import TrashIcon from '../icons/TrashIcon';
import RemoveAvatarIcon from '../icons/RemoveAvatarIcon';

import BannerMenuListItem from '../bannerMenuListItem/BannerMenuListItem';

import { BannerMenuListProps } from '../../types';

import './BannerMenuList.scss';

const BannerMenuList = ({
  role,
  isOpen,
  image,
  banner,
  query,
  username,
  isBlocked,
  onShare,
  onMute,
  onReport,
  onBlock,
  onRemoveBanner,
  onRemoveAvatar,
  onDeactivate,
}: BannerMenuListProps) => {
  const itemLabel = useCallback(
    (label: string) => {
      return `${label} @${username}`;
    },
    [username]
  );

  const menuListClasses = useMemo(() => {
    return isOpen ? 'banner-menu-list show' : 'banner-menu-list hide';
  }, [isOpen]);

  return (
    <ul className={menuListClasses}>
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
                    label={itemLabel('Mute')}
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
