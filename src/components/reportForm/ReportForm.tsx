import Select from '../select/Select';
import Textarea from '../textarea/Textarea';

import { ReportFormProps } from '../../types';

import './ReportForm.scss';

const ReportForm = ({
  reason,
  username,
  targetType,
  disabled,
  options,
  register,
  reasonError,
  detailsError,
  customError,
}: ReportFormProps) => {
  return (
    <div className='report-form'>
      <div className='report-form__container'>
        <p className='report-form__container--label'>
          You’re reporting a {targetType} made by <strong>{username}</strong>:
        </p>
        <Select
          name='reason'
          label='Reason'
          disabled={disabled}
          defaultValue='Select a reason...'
          options={options}
          register={register}
          error={reasonError}
          validate
        />
        {reason && reason !== 'Other' && (
          <Textarea
            name='details'
            label='Details (optional)'
            disabled={disabled}
            register={register}
            error={detailsError}
            placeholder='Provide more details...'
          />
        )}
      </div>

      {reason === 'Other' && (
        <div className='report-form__wrapper'>
          <Textarea
            name='customReason'
            label='Custom Reason'
            disabled={disabled}
            register={register}
            error={customError}
            placeholder='Describe your reason...'
            validate
          />
          <p className='report-form__wrapper--text'>
            Please provide as much detail as possible to help us understand the
            issue.
          </p>
        </div>
      )}

      <div className='report-form__box'>
        <input
          {...register('muteUser')}
          id='muteUser'
          name='muteUser'
          type='checkbox'
          disabled={disabled}
          aria-disabled={disabled}
          className='report-form__box--input'
        />
        <label
          htmlFor='muteUser'
          aria-disabled={disabled}
          className='report-form__box--label'
        >
          Also mute {username} (you won’t see their comments again)
        </label>
      </div>
    </div>
  );
};

export default ReportForm;
