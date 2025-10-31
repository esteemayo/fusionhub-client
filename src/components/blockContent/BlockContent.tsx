import Textarea from '../textarea/Textarea';

import { BlockContentProps } from '../../types';

import './BlockContent.scss';

const BlockContent = ({ isBlocked, register, errors }: BlockContentProps) => {
  return (
    <div className='block-content'>
      <div className='block-content__container'>
        <p className='block-content__container--description'>
          {isBlocked
            ? 'Are you sure you want to unblock this user?'
            : 'Blocking this user will prevent them from interacting with you in any way.'}
        </p>
        {!isBlocked && (
          <Textarea
            name='reason'
            label='Reason (optional)'
            register={register}
            errors={errors}
            placeholder='Reason for blocking...'
          />
        )}
        {!isBlocked && (
          <small className='block-content__container--info'>
            You can manage blocked users anytime in your{' '}
            <strong>Account Settings → Blocked Users</strong>.
          </small>
        )}
      </div>
    </div>
  );
};

export default BlockContent;
