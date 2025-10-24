import { useCallback, useMemo } from 'react';

import ReportIcon from '../ReportIcon';
import MuteIcon from '../MuteIcon';
import DeactivateIcon from '../DeactivateIcon';
import BlockIcon from '../BlockIcon';
import RemoveAvatarIcon from '../RemoveAvatarIcon';
import TrashIcon from '../TrashIcon';

import BannerMenuListItem from '../bannerMenuListItem/BannerMenuListItem';

import { BannerMenuListProps } from '../../types';

import './BannerMenuList.scss';

const BannerMenuList = ({
  isOpen,
  query,
  username,
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
          <BannerMenuListItem label={itemLabel('Mute')} onAction={onMute}>
            <MuteIcon />
          </BannerMenuListItem>
          <BannerMenuListItem label={itemLabel('Report')} onAction={onReport}>
            <ReportIcon />
          </BannerMenuListItem>
          <BannerMenuListItem
            type='danger'
            label={itemLabel('Block')}
            onAction={onBlock}
          >
            <BlockIcon />
          </BannerMenuListItem>
        </>
      )}

      {!query && (
        <>
          <BannerMenuListItem label='Remove Banner' onAction={onRemoveBanner}>
            <TrashIcon />
          </BannerMenuListItem>
          <BannerMenuListItem label='Remove Avatar' onAction={onRemoveAvatar}>
            <RemoveAvatarIcon />
          </BannerMenuListItem>
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
