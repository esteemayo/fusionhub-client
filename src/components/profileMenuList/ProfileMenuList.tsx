import TrashIcon from '../icons/TrashIcon';
import EditIcon from '../icons/EditIcon';
import ProfileMenuListItem from '../profileMenuListItem/ProfileMenuListItem';

import { ProfileMenuListProps } from '../../types';

import './ProfileMenuList.scss';

const ProfileMenuList = ({ onDelete, onUpdate }: ProfileMenuListProps) => {
  return (
    <ul className='profile-menu-list '>
      <ProfileMenuListItem label='Edit' onClick={onUpdate}>
        <EditIcon />
      </ProfileMenuListItem>
      <ProfileMenuListItem type='delete' label='Delete' onClick={onDelete}>
        <TrashIcon />
      </ProfileMenuListItem>
    </ul>
  );
};

export default ProfileMenuList;
