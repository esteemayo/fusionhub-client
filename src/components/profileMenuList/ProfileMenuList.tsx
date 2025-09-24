import ProfileMenuListItem from '../profileMenuListItem/ProfileMenuListItem';

import { ProfileMenuListProps } from '../../types';

import './ProfileMenuList.scss';

const ProfileMenuList = ({ onDelete, onUpdate }: ProfileMenuListProps) => {
  return (
    <ul className='profile-menu-list '>
      <ProfileMenuListItem label='Edit' onClick={onUpdate} />
      <ProfileMenuListItem label='Delete' onClick={onDelete} />
    </ul>
  );
};

export default ProfileMenuList;
