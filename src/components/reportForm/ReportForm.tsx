import Select from '../select/Select';
import Textarea from '../textarea/Textarea';

import { ReportFormProps } from '../../types';

import './ReportForm.scss';

const ReportForm = ({
  reason,
  username,
  targetType,
  isMuted,
  disabled,
  options,
  register,
  reasonError,
  detailsError,
  customError,
}: ReportFormProps) => {
  return (
    <div
      className='report-form'
      role='form'
      aria-labelledby='report-form-title'
    >
      <div className='report-form__container'>
        {targetType === 'User' ? (
          <p id='report-form-title' className='report-form__container--label'>
            You’re reporting @{username}
          </p>
        ) : (
          <p id='report-form-title' className='report-form__container--label'>
            You’re reporting a <span>{targetType}</span> made by{' '}
            <strong>{username}</strong>:
          </p>
        )}

        <Select
          name='reason'
          label='Reason'
          disabled={disabled}
          defaultValue='Select a reason...'
          options={options}
          register={register}
          error={reasonError}
          validate
          aria-invalid={!!reasonError}
          aria-describedby={reasonError ? 'reason-error' : undefined}
        />

        {reasonError && (
          <p
            id='reason-error'
            className='sr-only'
            role='alert'
            aria-live='polite'
          >
            {reasonError}
          </p>
        )}

        {reason && reason !== 'Other' && (
          <>
            <Textarea
              name='details'
              label='Details (optional)'
              disabled={disabled}
              register={register}
              error={detailsError}
              placeholder='Provide more details...'
              aria-invalid={!!detailsError}
              aria-describedby={detailsError ? 'details-error' : undefined}
            />

            {detailsError && (
              <p
                id='details-error'
                className='sr-only'
                role='alert'
                aria-live='polite'
              >
                {detailsError}
              </p>
            )}
          </>
        )}
      </div>

      {reason && reason === 'Other' && (
        <div
          className='report-form__wrapper'
          aria-labelledby='custom-reason-label'
        >
          <Textarea
            name='customReason'
            label='Custom Reason'
            disabled={disabled}
            register={register}
            error={customError}
            placeholder='Describe your reason...'
            validate
            aria-invalid={!!customError}
            aria-describedby={
              customError ? 'custom-reason-error custom-reason-help' : undefined
            }
          />

          {customError && (
            <p
              id='custom-reason-error'
              className='sr-only'
              role='alert'
              aria-live='polite'
            >
              {customError}
            </p>
          )}

          <p id='custom-reason-help' className='report-form__wrapper--text'>
            Please provide as much detail as possible to help us understand the
            issue.
          </p>
        </div>
      )}

      {!isMuted && (
        <fieldset
          className='report-form__box'
          aria-describedby='mute-user-description'
        >
          <legend className='sr-only'>Mute User Options</legend>

          <input
            {...register('muteUser')}
            id='muteUser'
            name='muteUser'
            type='checkbox'
            disabled={disabled}
            className='report-form__box--input'
            aria-disabled={disabled}
          />

          <label
            htmlFor='muteUser'
            className='report-form__box--label'
            aria-disabled={disabled}
          >
            Also mute {username}
          </label>

          <p id='mute-user-description' className='sr-only'>
            You won’t see their comments again after muting.
          </p>
        </fieldset>
      )}
    </div>
  );
};

export default ReportForm;
