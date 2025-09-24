import { ProfileMenuListItemProps } from '../../types';

import './ProfileMenuListItem.scss';

const ProfileMenuListItem = ({ label, onClick }: ProfileMenuListItemProps) => {
  return (
    <li className='profile-menu-list-item'>
      <button type='button' onClick={onClick}>
        {label}
      </button>
    </li>
  );
};

export default ProfileMenuListItem;
