import { useMemo } from 'react';

import Textarea from '../textarea/Textarea';

import { MuteContentProps } from '../../types';

import './MuteContent.scss';

const MuteContent = ({
  description,
  targetType,
  isMuted,
  register,
  errors,
}: MuteContentProps) => {
  const mutedList = useMemo(() => {
    switch (targetType) {
      case 'User':
        return 'Muted Users';

      case 'Comment':
        return 'Muted Comments';

      case 'Reply':
        return 'Muted Replies';

      default:
        return '';
    }
  }, [targetType]);

  return (
    <div className='mute-content'>
      <div className='mute-content__container'>
        {!isMuted && (
          <p className='mute-content__container--text'>{description}</p>
        )}
        <p className='mute-content__container--text'>
          {isMuted
            ? `Are you sure you want to unmute this ${targetType.toLowerCase()}?`
            : `Provide an optional reason for muting this ${targetType.toLowerCase()}.`}
        </p>
        {!isMuted && (
          <div className='mute-content__wrapper'>
            <Textarea
              name='reason'
              label='Reason (optional)'
              register={register}
              errors={errors}
              placeholder='Enter a reason (optional)'
            />
          </div>
        )}
        {!isMuted && (
          <small className='mute-content__container--info'>
            Muting is private — the person won’t know you’ve muted them. You can
            manage muted items anytime in your{' '}
            <strong>Account Settings → Privacy → {mutedList}</strong>.
          </small>
        )}
      </div>
    </div>
  );
};

export default MuteContent;
