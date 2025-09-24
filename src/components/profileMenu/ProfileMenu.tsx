import { useMemo } from 'react';

import ProfileMenuList from '../profileMenuList/ProfileMenuList';

import { ProfileMenuProps } from '../../types';

import './ProfileMenu.scss';

const ProfileMenu = ({ isOpen, onDelete, onUpdate }: ProfileMenuProps) => {
  const profileMenuClasses = useMemo(() => {
    return isOpen ? 'profile-menu show' : 'profile-menu hide';
  }, [isOpen]);

  return (
    <aside className={profileMenuClasses}>
      <ProfileMenuList onDelete={onDelete} onUpdate={onUpdate} />
    </aside>
  );
};

export default ProfileMenu;
