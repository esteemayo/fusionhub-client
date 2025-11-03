import { useCallback, useMemo } from 'react';

import ReportIcon from '../icons/ReportIcon';
import MuteIcon from '../icons/MuteIcon';
import DeactivateIcon from '../icons/DeactivateIcon';
import BlockIcon from '../icons/BlockIcon';
import RemoveAvatarIcon from '../icons/RemoveAvatarIcon';
import TrashIcon from '../icons/TrashIcon';

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
          <BannerMenuListItem
            label={itemLabel('Share')}
            onAction={() => console.log('user profile shared')}
          >
            <MuteIcon />
          </BannerMenuListItem>
          {role !== 'admin' && (
            <>
              <BannerMenuListItem label={itemLabel('Mute')} onAction={onMute}>
                <MuteIcon />
              </BannerMenuListItem>
              <BannerMenuListItem
                label={itemLabel('Report')}
                onAction={onReport}
              >
                <ReportIcon />
              </BannerMenuListItem>
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
