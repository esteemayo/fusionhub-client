import ProfileMenuList from './ProfileMenuList';
import ContextMenu from './contextMenu/ContextMenu';

import { ProfileMenuProps } from '../types';

const ProfileMenu = ({
  isOpen,
  onClose,
  onDelete,
  onUpdate,
}: ProfileMenuProps) => {
  return (
    <ContextMenu isOpen={isOpen} onClose={onClose} type='feature'>
      <ProfileMenuList onDelete={onDelete} onUpdate={onUpdate} />
    </ContextMenu>
  );
};

export default ProfileMenu;
