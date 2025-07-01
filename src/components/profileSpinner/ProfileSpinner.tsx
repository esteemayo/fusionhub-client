import Spinner from '../Spinner';

import './ProfileSpinner.scss';

const ProfileSpinner = () => {
  return (
    <div className='profile-spinner'>
      <Spinner size={30} />
    </div>
  );
};

export default ProfileSpinner;
