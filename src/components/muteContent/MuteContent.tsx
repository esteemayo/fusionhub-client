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
    <section
      className='mute-content'
      role={isMuted ? 'alertdialog' : undefined}
      aria-labelledby='mute-content-heading'
    >
      <div className='mute-content__container'>
        <h2 id='mute-content-heading' className='sr-only'>
          {isMuted ? `Unmute ${targetType}` : `Mute ${targetType}`}
        </h2>

        {!isMuted && (
          <p
            className='mute-content__container--text'
            aria-live='polite'
            aria-atomic='true'
          >
            {description}
          </p>
        )}

        <p
          id='mute-content-status'
          className='mute-content__container--text'
          aria-live='polite'
          aria-atomic='true'
        >
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
              aria-describedby='mute-content-status'
              aria-invalid={!!errors?.reason}
            />
          </div>
        )}

        {!isMuted && (
          <small
            id='mute-help-text'
            className='mute-content__container--info'
            aria-live='polite'
          >
            Muting is private — the person won’t know you’ve muted them. You can
            manage muted items anytime in your{' '}
            <strong>Account Settings → Privacy → {mutedList}</strong>.
          </small>
        )}
      </div>
    </section>
  );
};

export default MuteContent;
