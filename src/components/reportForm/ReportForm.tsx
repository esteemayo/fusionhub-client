import Select from '../select/Select';
import Textarea from '../textarea/Textarea';

import { ReportFormProps } from '../../types';

import './ReportForm.scss';

const ReportForm = ({
  reason,
  username,
  disabled,
  options,
  register,
  reasonError,
  customError,
}: ReportFormProps) => {
  return (
    <div className='report-form'>
      <div className='report-form__container'>
        <p className='report-form__container--label'>
          You’re reporting a comment made by <strong>{username}</strong>:
        </p>
        <Select
          name='reason'
          label='Reason'
          disabled={disabled}
          defaultValue='Select a reason...'
          options={options}
          register={register}
          error={reasonError}
        />
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
          type='checkbox'
          name='muteUser'
          id='muteUser'
          className='report-form__box--input'
        />
        <label htmlFor='muteUser' className='report-form__box--label'>
          Also mute {username} (you won’t see their comments again)
        </label>
      </div>
    </div>
  );
};

export default ReportForm;
