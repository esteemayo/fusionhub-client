import { useMemo } from 'react';

import BlockIcon from '../BlockIcon';
import MuteIcon from '../MuteIcon';
import ReportIcon from '../ReportIcon';
import BannerMenuListItem from '../bannerMenuListItem/BannerMenuListItem';

import { BannerMenuListProps } from '../../types';

import './BannerMenuList.scss';

const BannerMenuList = ({ isOpen }: BannerMenuListProps) => {
  const menuListClasses = useMemo(() => {
    return isOpen ? 'banner-menu-list show' : 'banner-menu-list hide';
  }, [isOpen]);

  return (
    <ul className={menuListClasses}>
      <BannerMenuListItem label='Mute' onAction={() => console.log('muted')}>
        <MuteIcon />
      </BannerMenuListItem>
      <BannerMenuListItem
        label='Report'
        onAction={() => console.log('reported')}
      >
        <ReportIcon />
      </BannerMenuListItem>
      <BannerMenuListItem
        type='block'
        label='Block'
        onAction={() => console.log('blocked')}
      >
        <BlockIcon />
      </BannerMenuListItem>
    </ul>
  );
};

export default BannerMenuList;
