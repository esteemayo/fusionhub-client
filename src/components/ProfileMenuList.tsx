import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import ProfileMenuListItem from './profileMenuListItem/ProfileMenuListItem';

import { ProfileMenuListProps } from '../types';

const ProfileMenuList = ({ onDelete, onUpdate }: ProfileMenuListProps) => {
  return (
    <ContextMenuList>
      <ProfileMenuListItem label='Edit' onClick={onUpdate}>
        <EditIcon />
      </ProfileMenuListItem>
      <ProfileMenuListItem type='delete' label='Delete' onClick={onDelete}>
        <TrashIcon />
      </ProfileMenuListItem>
    </ContextMenuList>
  );
};

export default ProfileMenuList;
