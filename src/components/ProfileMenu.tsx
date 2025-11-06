import ContextMenu from './contextMenu/ContextMenu';
import ProfileMenuList from './ProfileMenuList';

import { ProfileMenuProps } from '../types';

const ProfileMenu = ({ isOpen, onDelete, onUpdate }: ProfileMenuProps) => {
  return (
    <ContextMenu isOpen={isOpen}>
      <ProfileMenuList onDelete={onDelete} onUpdate={onUpdate} />
    </ContextMenu>
  );
};

export default ProfileMenu;
