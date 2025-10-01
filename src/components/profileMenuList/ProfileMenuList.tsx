import DeleteIcon from '../DeleteIcon';
import EditIcon from '../EditIcon';
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
        <DeleteIcon />
      </ProfileMenuListItem>
    </ul>
  );
};

export default ProfileMenuList;
