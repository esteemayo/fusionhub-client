import { Value } from 'react-phone-number-input';
import parse from 'html-react-parser';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import AccountHeader from '../accountHeader/AccountHeader';
import ProfileDataForm from '../profileDataForm/ProfileDataForm';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetState, updateUserData } from '../../features/auth/authSlice';

import { CountrySelectType, ProfileDataProps } from '../../types';
import {
  ProfileDataFormData,
  profileSchema,
} from '../../validations/profileSchema';

import './ProfileData.scss';

const ProfileData = ({
  name,
  email,
  username,
  phone,
  dateOfBirth,
  country,
  bio,
  about,
}: ProfileDataProps) => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, message } = useAppSelector((state) => state.auth);

  const [telephone, setTelephone] = useState<Value | undefined>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [aboutMe, setAboutMe] = useState<ReactQuill.Value | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileDataFormData>({
    resolver: zodResolver(profileSchema),
  });

  const setCustomValue = useCallback(
    (name: keyof ProfileDataFormData, value: string | CountrySelectType) => {
      setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<ProfileDataFormData> = (data) => {
    const userData = {
      ...data,
      country: (data.country as CountrySelectType).label,
      phone: telephone,
      about: aboutMe,
      dateOfBirth: startDate,
    };

    dispatch(updateUserData(userData));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message, { role: 'alert' });
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, isError, message]);

  useEffect(() => {
    setCustomValue('name', name);
    setCustomValue('email', email);
    setCustomValue('username', username);
    setCustomValue('country', country);
    setCustomValue('bio', bio);

    const parsedText = parse(String(about)) as ReactQuill.Value;
    setAboutMe(parsedText);
    setStartDate(dateOfBirth || null);
    setTelephone(phone);
  }, [
    about,
    bio,
    country,
    dateOfBirth,
    email,
    name,
    phone,
    setCustomValue,
    username,
  ]);

  const headerId = 'profile-data-heading';
  const descId = 'profile-data-description';
  const statusId = 'profile-data-status';

  return (
    <div
      className='profile-data'
      role='form'
      aria-labelledby={headerId}
      aria-describedby={descId}
      aria-live='polite'
    >
      <AccountHeader
        title='Personal information'
        subtitle='Update your personal information'
        titleId={headerId}
        descriptionId={descId}
      />

      <h2 id={headerId} className='sr-only'>
        Personal information
      </h2>

      <p id={descId} className='sr-only'>
        Update your name, username, contact details, and about information.
      </p>

      <div id={statusId} className='sr-only' aria-live='polite'>
        {isError && message ? message : ''}
      </div>

      <ProfileDataForm
        about={aboutMe}
        dateOfBirth={dateOfBirth}
        startDate={startDate}
        phone={telephone}
        isLoading={isLoading}
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        onChangeAbout={setAboutMe}
        onChangeCustom={setCustomValue}
        onChangeDate={setStartDate}
        onChangePhone={setTelephone}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby={headerId}
        aria-describedby={descId}
      />
    </div>
  );
};

export default ProfileData;
