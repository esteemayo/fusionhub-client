import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Textarea from '../../components/textarea/Textarea';

import AccountHeader from '../../components/accountHeader/AccountHeader';

import './ProfileData.scss';
import PhoneNumber from '../phoneNumber/PhoneNumber';

const ProfileData = ({
  onSubmit,
}: {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}) => {
  return (
    <div className='profileData'>
      <AccountHeader
        title='Personal information'
        subtitle='Update your personal information'
      />
      <form onSubmit={onSubmit} className='profileData__form'>
        <div className='profileData__form--data'>
          <Input name='name' label='Name' placeholder='Name' />
          <Input name='username' label='Username' placeholder='Username' />
          <Input
            type='email'
            name='email'
            label='Email address'
            placeholder='Email address'
          />
          {/* <Input
            type='tel'
            name='phone'
            label='Mobile number'
            placeholder='Mobile number'
          /> */}
          <PhoneNumber />
        </div>
        <div className='profileData__form--info'>
          <Textarea
            name='bio'
            label='Biography'
            placeholder='Write something about who you are...'
          />
        </div>
        <Button type='submit' label='Save Changes' className='primary' />
      </form>
    </div>
  );
};

export default ProfileData;
