import Textarea from '../textarea/Textarea';
import { BlockContentProps } from '../../types';

import './BlockContent.scss';

const BlockContent = ({ isBlocked, register, errors }: BlockContentProps) => {
  const infoId = 'block-content-info';
  const descriptionId = 'block-content-description';

  return (
    <div
      className='block-content'
      role='region'
      aria-describedby={descriptionId}
    >
      <div className='block-content__container'>
        <p
          id={descriptionId}
          className='block-content__container--description'
          aria-live='polite'
        >
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
            aria-describedby={infoId}
          />
        )}

        {!isBlocked && (
          <small
            id={infoId}
            className='block-content__container--info'
            role='note'
          >
            You can manage blocked users anytime in your{' '}
            <strong>Account Settings → Blocked Users</strong>.
          </small>
        )}
      </div>
    </div>
  );
};

export default BlockContent;
